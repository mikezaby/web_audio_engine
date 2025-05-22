import { ModuleType, ModuleTypeToPropsMapping } from "@blibliki/engine";
import { assertNever, notImplemented } from "@blibliki/utils";
import { JSX } from "react";
import { useAppDispatch } from "@/hooks";
import Envelope from "./Envelope";
import Filter from "./Filter";
import Gain from "./Gain";
import Master from "./Master";
import MidiDeviceSelector from "./MidiDeviceSelector";
import Oscillator from "./Oscillator";
import { updateModule } from "./modulesSlice";

export interface AudioModuleProps<T extends ModuleType> {
  id: string;
  name: string;
  moduleType: T;
  props: ModuleTypeToPropsMapping[T];
}

export type ModuleComponent<T extends ModuleType> = (
  props: AudioModuleProps<T> & {
    updateProp: <K extends keyof ModuleTypeToPropsMapping[T]>(
      propName: K,
    ) => (value: ModuleTypeToPropsMapping[T][K]) => void;
  },
) => JSX.Element;

type TUpdateProps<T extends ModuleType> = (
  props: Partial<ModuleTypeToPropsMapping[T]>,
) => void;

export default function AudioModule<T extends ModuleType>(audioModuleProps: {
  audioModule: AudioModuleProps<T>;
}) {
  const dispatch = useAppDispatch();

  const { id, name, moduleType, props } = audioModuleProps.audioModule;

  let Component: ModuleComponent<T>;

  const updateProps: TUpdateProps<T> = (props) => {
    dispatch(updateModule({ id, moduleType, changes: { props } }));
  };

  const updateProp =
    <K extends keyof ModuleTypeToPropsMapping[T]>(propName: K) =>
    (value: ModuleTypeToPropsMapping[T][K]) => {
      const patch = {
        [propName]: value,
      } as { [P in K]: ModuleTypeToPropsMapping[T][P] } as Partial<
        ModuleTypeToPropsMapping[T]
      >;

      updateProps(patch);
    };

  switch (moduleType) {
    case ModuleType.Master:
      Component = Master;
      break;
    case ModuleType.Oscillator:
      Component = Oscillator as ModuleComponent<T>;
      break;
    case ModuleType.Filter:
      Component = Filter as ModuleComponent<T>;
      break;
    case ModuleType.Gain:
      Component = Gain as ModuleComponent<T>;
      break;
    case ModuleType.Envelope:
      Component = Envelope as ModuleComponent<T>;
      break;
    case ModuleType.MidiSelector:
      Component = MidiDeviceSelector as ModuleComponent<T>;
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
      updateProp={updateProp}
    />
  );
}
