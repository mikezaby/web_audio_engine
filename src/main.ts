import Engine from "./Engine";
import { ModuleType } from "./core";

let osc = Engine.addModule<ModuleType.Oscillator>({
  name: "osc",
  moduleType: ModuleType.Oscillator,
  props: { wave: "sine", frequency: 200 },
});

let vol = Engine.addModule<ModuleType.Volume>({
  name: "vol",
  moduleType: ModuleType.Volume,
  props: { volume: 100 },
});

osc = Engine.updateModule({
  id: osc.id,
  moduleType: osc.moduleType,
  changes: { props: { frequency: 440 } },
});
vol = Engine.updateModule({
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
