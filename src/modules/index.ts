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

export interface IChildParams<T extends ModuleType> {
  id?: string;
  name: string;
  props: Partial<ModuleTypeToPropsMapping[T]>;
}

export interface ICreateModule<T extends ModuleType> extends IChildParams<T> {
  moduleType: T;
}

export type ICreateParams =
  | ICreateModule<ModuleType.Oscillator>
  | ICreateModule<ModuleType.Volume>;

export function createModule(params: ICreateParams): AnyModule {
  switch (params.moduleType) {
    case ModuleType.Oscillator:
      return new Oscillator(params);
    case ModuleType.Volume:
      return new Volume(params);
    default:
      // @ts-expect-error: 2339
      throw Error(`Unknown moduleType ${params.moduleType}`);
  }
}
