import { assertNever } from "@blibliki/utils";
import { IAnyAudioContext, IModule, Module } from "@/core";
import Constant, { IConstantProps } from "./Constant";
import Envelope, { IEnvelopeProps } from "./Envelope";
import Filter, { IFilterProps } from "./Filter";
import Inspector, { IInspectorProps } from "./Inspector";
import Master, { IMasterProps } from "./Master";
import MidiSelector, { IMidiSelectorProps } from "./MidiSelector";
import Oscillator, { IOscillatorProps } from "./Oscillator";
import Scale, { IScaleProps } from "./Scale";
import Volume, { IVolumeProps } from "./Volume";

export enum ModuleType {
  Master = "Master",
  Oscillator = "Oscillator",
  Volume = "Volume",
  MidiSelector = "MidiSelector",
  Envelope = "Envelope",
  Filter = "Filter",
  Scale = "Scale",
  Inspector = "Inspector",
  Constant = "Constant",
}

export interface ModuleTypeToPropsMapping {
  [ModuleType.Oscillator]: IOscillatorProps;
  [ModuleType.Volume]: IVolumeProps;
  [ModuleType.Master]: IMasterProps;
  [ModuleType.MidiSelector]: IMidiSelectorProps;
  [ModuleType.Envelope]: IEnvelopeProps;
  [ModuleType.Filter]: IFilterProps;
  [ModuleType.Scale]: IScaleProps;
  [ModuleType.Inspector]: IInspectorProps;
  [ModuleType.Constant]: IConstantProps;
}

export type { IOscillator } from "./Oscillator";
export type { IVolume } from "./Volume";
export type { IMaster } from "./Master";
export type { IMidiSelector } from "./MidiSelector";

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
    case ModuleType.MidiSelector:
      return new MidiSelector(
        context,
        params as ICreateParams<ModuleType.MidiSelector>,
      );
    case ModuleType.Envelope:
      return new Envelope(
        context,
        params as ICreateParams<ModuleType.Envelope>,
      );
    case ModuleType.Filter:
      return new Filter(context, params as ICreateParams<ModuleType.Filter>);
    case ModuleType.Scale:
      return new Scale(context, params as ICreateParams<ModuleType.Scale>);
    case ModuleType.Inspector:
      return new Inspector(
        context,
        params as ICreateParams<ModuleType.Inspector>,
      );
    case ModuleType.Constant:
      return new Constant(
        context,
        params as ICreateParams<ModuleType.Constant>,
      );
    default:
      assertNever(params.moduleType);
  }
}
