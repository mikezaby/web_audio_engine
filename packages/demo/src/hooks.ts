import { Engine, ModuleType, type IModule } from "@blibliki/engine";
import { assertDefined } from "@blibliki/utils";
import { useEffect, useState } from "react";

export const useEngine = () => {
  const [engine, setEngine] = useState<Engine>();
  const [isInitialized, setInitialized] = useState(false);
  const [isStarted, setStarted] = useState(false);

  useEffect(() => {
    const init = async () => {
      const context = new AudioContext();
      const newEngine = new Engine(context);
      await newEngine.initialize();

      setEngine(newEngine);
      setInitialized(true);
    };

    void init();
  }, []);

  const start = () => {
    assertDefined(engine);

    engine.start();
    setStarted(true);
  };

  const stop = () => {
    assertDefined(engine);

    engine.stop();
    setStarted(false);
  };

  const addModule = <T extends ModuleType>(params: {
    name: string;
    moduleType: T;
    props: any;
  }): IModule<T> => {
    assertDefined(engine);

    return engine.addModule({
      name: params.name,
      moduleType: params.moduleType,
      props: params.props,
    });
  };

  const addRoute = (
    source: { moduleId: string; ioName: string },
    destination: { moduleId: string; ioName: string },
  ) => {
    assertDefined(engine);

    engine.addRoute({ source, destination });
  };

  return {
    engine,
    isInitialized,
    isStarted,
    start,
    stop,
    addModule,
    addRoute,
  };
};
