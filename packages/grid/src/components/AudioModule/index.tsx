import { ModuleType } from "@blibliki/engine";
import { assertNever, notImplemented } from "@blibliki/utils";
import { JSX } from "react";
import { useAppDispatch } from "@/hooks";
import { AnyObject } from "@/types";
import Envelope from "./Envelope";
import Filter from "./Filter";
import Master from "./Master";
import MidiDeviceSelector from "./MidiDeviceSelector";
import Oscillator from "./Oscillator";
import Volume from "./Volume";
import { updateModule } from "./modulesSlice";

export interface AudioModuleProps {
  id: string;
  name: string;
  moduleType: ModuleType;
  props: any; // TODO: Make a solid solution with specific typy
}

export type TUpdateProps = (id: string, props?: object) => void;

export default function AudioModule(audioModuleProps: {
  audioModule: AudioModuleProps;
  componentType?: string;
}) {
  const dispatch = useAppDispatch();

  const { id, name, moduleType, props } = audioModuleProps.audioModule;

  let Component: (
    props: AudioModuleProps & {
      updateProps: (id: string, props: AnyObject) => void;
    },
  ) => JSX.Element;

  const updateProps = (id: string, props: AnyObject) => {
    dispatch(updateModule({ id, moduleType, changes: { props } }));
  };

  switch (moduleType) {
    case ModuleType.Master:
      Component = Master;
      break;
    case ModuleType.Oscillator:
      Component = Oscillator;
      break;
    case ModuleType.Filter:
      Component = Filter;
      break;
    case ModuleType.Volume:
      Component = Volume;
      break;
    case ModuleType.Envelope:
      Component = Envelope;
      break;
    case ModuleType.MidiSelector:
      Component = MidiDeviceSelector;
      break;
    case ModuleType.Inspector:
      notImplemented();
    case ModuleType.Constant:
      notImplemented();
    case ModuleType.Scale:
      notImplemented();
    default:
      assertNever(moduleType);
  }

  return (
    <Component
      id={id}
      moduleType={moduleType}
      name={name}
      props={props}
      updateProps={updateProps}
    />
  );
}
