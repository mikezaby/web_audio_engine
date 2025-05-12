import { ModuleType, OscillatorWave } from "@blibliki/engine";
import { useEngineStore } from "../store/useEngineStore";

export function load() {
  const { addModule, addRoute } = useEngineStore.getState();

  const osc = addModule({
    name: "Oscillator",
    moduleType: ModuleType.Oscillator,
    props: { wave: OscillatorWave.sawtooth },
  });

  const gain = addModule({
    name: "Gain",
    moduleType: ModuleType.Gain,
    props: { gain: 0.01 },
  });

  const filter = addModule({
    name: "Filter",
    moduleType: ModuleType.Filter,
    props: { cutoff: 200 },
  });

  const master = addModule({
    name: "Master",
    moduleType: ModuleType.Master,
    props: {},
  });

  addRoute({
    source: { moduleId: osc.id, ioName: "out" },
    destination: { moduleId: gain.id, ioName: "in" },
  });

  addRoute({
    source: { moduleId: gain.id, ioName: "out" },
    destination: { moduleId: filter.id, ioName: "in" },
  });

  addRoute({
    source: { moduleId: filter.id, ioName: "out" },
    destination: { moduleId: master.id, ioName: "in" },
  });
}
