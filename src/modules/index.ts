import { IChildParams, ModuleType } from "../core";
import Oscillator, { IOscillator } from "./Oscillator";
import Volume, { IVolume } from "./Volume";

export type AnyModule = Oscillator | Volume;
export type IAnyModule = IOscillator | IVolume;

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
