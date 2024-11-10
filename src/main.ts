import { Engine } from ".";
import { ModuleType } from "./modules";

const context = new AudioContext();
const engine = new Engine(context);

const osc = engine.addModule({
  name: "osc",
  moduleType: ModuleType.Oscillator,
  props: { wave: "sine", frequency: 440 },
});

const lfo = engine.addModule({
  name: "osc",
  moduleType: ModuleType.Oscillator,
  props: { wave: "sine", frequency: 2 },
});

const vol = engine.addModule({
  name: "vol",
  moduleType: ModuleType.Volume,
  props: { volume: 0.01 },
});

const master = engine.addModule({
  name: "master",
  moduleType: ModuleType.Master,
  props: {},
});

engine.addRoute({
  source: { moduleId: osc.id, ioName: "out" },
  destination: { moduleId: vol.id, ioName: "in" },
});
engine.addRoute({
  source: { moduleId: lfo.id, ioName: "out" },
  destination: { moduleId: osc.id, ioName: "detune" },
});
engine.addRoute({
  source: { moduleId: vol.id, ioName: "out" },
  destination: { moduleId: master.id, ioName: "in" },
});

declare global {
  interface Window {
    toggle: () => Promise<void>;
  }
}

window.toggle = async () => {
  if (engine.isStarted) {
    engine.stop();
  } else {
    await engine.start();
  }
};

const appEl = document.querySelector<HTMLDivElement>("#app");
if (!appEl) {
  throw Error("Application container #app not found");
}

appEl.innerHTML = `
<div>
  Hello Web Audio
  <button onclick="toggle()">toggle</button>
</div>
`;
