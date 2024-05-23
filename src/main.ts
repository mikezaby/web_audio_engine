import { Engine } from "./Engine";
import { ModuleType } from "./modules";

const engine = new Engine();

let osc = engine.addModule<ModuleType.Oscillator>({
  name: "osc",
  moduleType: ModuleType.Oscillator,
  props: { wave: "sine", frequency: 200 },
});

let vol = engine.addModule<ModuleType.Volume>({
  name: "vol",
  moduleType: ModuleType.Volume,
  props: { volume: 100 },
});

osc = engine.updateModule({
  id: osc.id,
  moduleType: osc.moduleType,
  changes: { props: { frequency: 440 } },
});
vol = engine.updateModule({
  id: vol.id,
  moduleType: vol.moduleType,
  changes: { props: { volume: 80 } },
});

console.log(osc);
console.log(vol);

document.querySelector<HTMLDivElement>("#app")!.innerHTML = `
  <div>
    Hello Web Audio
  </div>
`;
