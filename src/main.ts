import { Engine } from ".";
import { ModuleType } from "./modules";

const context = new AudioContext();
const engine = new Engine(context);

let osc = engine.addModule({
  name: "osc",
  moduleType: ModuleType.Oscillator,
  props: { wave: "sine", frequency: 200 },
});

let vol = engine.addModule({
  name: "vol",
  moduleType: ModuleType.Volume,
  props: { volume: 100 },
});

const master = engine.addModule({
  name: "master",
  moduleType: ModuleType.Master,
  props: {},
});

osc = engine.updateModule({
  id: osc.id,
  moduleType: osc.moduleType,
  changes: { props: { frequency: 440 } },
});
vol = engine.updateModule({
  id: vol.id,
  moduleType: vol.moduleType,
  changes: { props: { volume: 0.01 } },
});

engine.connect(osc.id, vol.id);
engine.connect(vol.id, master.id);

declare global {
  interface Window {
    toggle: () => Promise<void>;
  }
}

window.toggle = async () => {
  if (engine.isStarted) {
    engine.stop();
    // This is temporary, we will implement a automate solution for this
    engine.connect(osc.id, vol.id);
  } else {
    await engine.start();
  }
};

setInterval(() => {
  osc = engine.updateModule({
    id: osc.id,
    moduleType: osc.moduleType,
    changes: { props: { frequency: 2000 * Math.random() } },
  });
}, 1000);

document.querySelector<HTMLDivElement>("#app")!.innerHTML = `
  <div>
    Hello Web Audio
    <button onclick="toggle()">toggle</button>
  </div>
`;
