import { assertNever } from "../utils";
import Oscillator, { IOscillatorProps } from "./Oscillator";
import Volume, { IVolumeProps } from "./Volume";
import Master, { IMasterProps } from "./Master";
import { IAnyAudioContext, IModule, Module } from "../core";

export enum ModuleType {
  Master = "Master",
  Oscillator = "Oscillator",
  Volume = "Volume",
}

export interface ModuleTypeToPropsMapping {
  [ModuleType.Oscillator]: IOscillatorProps;
  [ModuleType.Volume]: IVolumeProps;
  [ModuleType.Master]: IMasterProps;
}

export type { IOscillator } from "./Oscillator";
export type { IVolume } from "./Volume";
export type { IMaster } from "./Master";

export type AnyModule = Module<ModuleType>;
export type IAnyModule = IModule<ModuleType>;

export interface ICreateParams<T extends ModuleType> {
  id?: string;
  name: string;
  moduleType: T;
  props: Partial<ModuleTypeToPropsMapping[T]>;
}

export function createModule<T extends ModuleType>(
  context: IAnyAudioContext,
  params: ICreateParams<T>,
): AnyModule {
  switch (params.moduleType) {
    case ModuleType.Oscillator:
      return new Oscillator(
        context,
        params as ICreateParams<ModuleType.Oscillator>,
      );
    case ModuleType.Volume:
      return new Volume(context, params as ICreateParams<ModuleType.Volume>);
    case ModuleType.Master:
      return new Master(context, params as ICreateParams<ModuleType.Master>);
    default:
      assertNever(params.moduleType);
  }
}
