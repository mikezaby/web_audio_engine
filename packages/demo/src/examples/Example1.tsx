import { ModuleType, OscillatorWave } from "@blibliki/engine";
import { useEffect } from "react";
import { useEngineStore } from "../store/useEngineStore";

const Example1 = () => {
  const { isInitialized, addModule, addRoute, dispose } = useEngineStore();

  useEffect(() => {
    if (!isInitialized) return;

    const osc = addModule({
      name: "Oscillator",
      moduleType: ModuleType.Oscillator,
      props: { wave: OscillatorWave.sawtooth },
    });

    const gain = addModule({
      name: "Gain",
      moduleType: ModuleType.Gain,
      props: { gain: 0.006 },
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
      destination: { moduleId: master.id, ioName: "in" },
    });

    return () => {
      dispose();
    };
  }, [isInitialized, addRoute, addModule, dispose]);

  return <div>Osc -&gt; Gain -&gt; Master</div>;
};

export default Example1;
