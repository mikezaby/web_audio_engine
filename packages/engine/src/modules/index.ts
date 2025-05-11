import { assertNever } from "@blibliki/utils";
import { IModule, Module, PropSchema } from "@/core";
import Constant, { constantPropSchema, IConstantProps } from "./Constant";
import Envelope, { envelopePropSchema, IEnvelopeProps } from "./Envelope";
import Filter, { filterPropSchema, IFilterProps } from "./Filter";
import Gain, { gainPropSchema, IGainProps } from "./Gain";
import Inspector, { IInspectorProps, inspectorPropSchema } from "./Inspector";
import Master, { IMasterProps, masterPropSchema } from "./Master";
import MidiSelector, {
  IMidiSelectorProps,
  midiSelectorPropSchema,
} from "./MidiSelector";
import Oscillator, {
  IOscillatorProps,
  oscillatorPropSchema,
} from "./Oscillator";
import Scale, { IScaleProps, scalePropSchema } from "./Scale";

export enum ModuleType {
  Master = "Master",
  Oscillator = "Oscillator",
  Gain = "Gain",
  MidiSelector = "MidiSelector",
  Envelope = "Envelope",
  Filter = "Filter",
  Scale = "Scale",
  Inspector = "Inspector",
  Constant = "Constant",
}

export interface ModuleTypeToPropsMapping {
  [ModuleType.Oscillator]: IOscillatorProps;
  [ModuleType.Gain]: IGainProps;
  [ModuleType.Master]: IMasterProps;
  [ModuleType.MidiSelector]: IMidiSelectorProps;
  [ModuleType.Envelope]: IEnvelopeProps;
  [ModuleType.Filter]: IFilterProps;
  [ModuleType.Scale]: IScaleProps;
  [ModuleType.Inspector]: IInspectorProps;
  [ModuleType.Constant]: IConstantProps;
}

export const moduleSchemas: {
  [K in ModuleType]: PropSchema<ModuleTypeToPropsMapping[K]>;
} = {
  [ModuleType.Oscillator]: oscillatorPropSchema,
  [ModuleType.Gain]: gainPropSchema,
  [ModuleType.Master]: masterPropSchema,
  [ModuleType.MidiSelector]: midiSelectorPropSchema,
  [ModuleType.Envelope]: envelopePropSchema,
  [ModuleType.Filter]: filterPropSchema,
  [ModuleType.Scale]: scalePropSchema,
  [ModuleType.Inspector]: inspectorPropSchema,
  [ModuleType.Constant]: constantPropSchema,
};

export type { IOscillator } from "./Oscillator";
export { OscillatorWave } from "./Oscillator";
export type { IGain } from "./Gain";
export type { IMaster } from "./Master";
export type { IMidiSelector } from "./MidiSelector";

export type AnyModule = Module<ModuleType>;
export type IAnyModule = IModule<ModuleType>;

export interface ICreateModule<T extends ModuleType> {
  id?: string;
  name: string;
  moduleType: T;
  props: Partial<ModuleTypeToPropsMapping[T]>;
}

export function createModule<T extends ModuleType>(
  engineId: string,
  params: ICreateModule<T>,
): AnyModule {
  switch (params.moduleType) {
    case ModuleType.Oscillator:
      return new Oscillator(
        engineId,
        params as ICreateModule<ModuleType.Oscillator>,
      );
    case ModuleType.Gain:
      return new Gain(engineId, params as ICreateModule<ModuleType.Gain>);
    case ModuleType.Master:
      return new Master(engineId, params as ICreateModule<ModuleType.Master>);
    case ModuleType.MidiSelector:
      return new MidiSelector(
        engineId,
        params as ICreateModule<ModuleType.MidiSelector>,
      );
    case ModuleType.Envelope:
      return new Envelope(
        engineId,
        params as ICreateModule<ModuleType.Envelope>,
      );
    case ModuleType.Filter:
      return new Filter(engineId, params as ICreateModule<ModuleType.Filter>);
    case ModuleType.Scale:
      return new Scale(engineId, params as ICreateModule<ModuleType.Scale>);
    case ModuleType.Inspector:
      return new Inspector(
        engineId,
        params as ICreateModule<ModuleType.Inspector>,
      );
    case ModuleType.Constant:
      return new Constant(
        engineId,
        params as ICreateModule<ModuleType.Constant>,
      );
    default:
      assertNever(params.moduleType);
  }
}
