import { assertNever } from "../utils";
import Oscillator, { IOscillator, IOscillatorProps } from "./Oscillator";
import Volume, { IVolume, IVolumeProps } from "./Volume";

export enum ModuleType {
  Oscillator = "Oscillator",
  Volume = "Volume",
}

export interface ModuleTypeToPropsMapping {
  [ModuleType.Oscillator]: IOscillatorProps;
  [ModuleType.Volume]: IVolumeProps;
}

export type AnyModule = Oscillator | Volume;
export type IAnyModule = IOscillator | IVolume;

export interface ICreateParams<T extends ModuleType> {
  id?: string;
  name: string;
  moduleType: T;
  props: Partial<ModuleTypeToPropsMapping[T]>;
}

export function createModule<T extends ModuleType>(
  params: ICreateParams<T>,
): AnyModule {
  switch (params.moduleType) {
    case ModuleType.Oscillator:
      return new Oscillator(params as ICreateParams<ModuleType.Oscillator>);
    case ModuleType.Volume:
      return new Volume(params as ICreateParams<ModuleType.Volume>);
    default:
      assertNever(params.moduleType);
  }
}
