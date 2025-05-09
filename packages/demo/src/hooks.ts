import {
  Engine,
  ModuleType,
  ICreateModule,
  ICreateRoute,
  IUpdateModule,
} from "@blibliki/engine";
import { assertDefined } from "@blibliki/utils";
import { useEffect, useState } from "react";

export const useEngine = () => {
  const [engine, setEngine] = useState<Engine>();
  const [isInitialized, setInitialized] = useState(false);
  const [isStarted, setStarted] = useState(false);

  useEffect(() => {
    const init = async () => {
      if (Engine.hasCurrent) {
        setEngine(Engine.current);
        setInitialized(true);
        return;
      }

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

  const addModule = <T extends ModuleType>(params: ICreateModule<T>) => {
    assertDefined(engine);

    return engine.addModule(params);
  };

  const updateModule = <T extends ModuleType>(params: IUpdateModule<T>) => {
    assertDefined(engine);

    return engine.updateModule(params);
  };

  const removeModule = (id: string) => {
    assertDefined(engine);

    engine.removeModule(id);
  };

  const addRoute = (params: ICreateRoute) => {
    assertDefined(engine);

    engine.addRoute(params);
  };

  const removeRoute = (id: string) => {
    assertDefined(engine);

    engine.removeRoute(id);
  };

  const dispose = () => {
    assertDefined(engine);

    engine.dispose();
    setStarted(false);
  };

  return {
    engine,
    isInitialized,
    isStarted,
    start,
    stop,
    addModule,
    updateModule,
    removeModule,
    addRoute,
    removeRoute,
    dispose,
  };
};
