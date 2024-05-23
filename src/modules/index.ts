import { assertNever } from "../utils";
import Oscillator, { IOscillator, IOscillatorProps } from "./Oscillator";
import Volume, { IVolume, IVolumeProps } from "./Volume";
import Master, { IMaster, IMasterProps } from "./Master";
import { IAnyAudioContext } from "../core";

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

export type AnyModule = Oscillator | Volume | Master;
export type IAnyModule = IOscillator | IVolume | IMaster;

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
