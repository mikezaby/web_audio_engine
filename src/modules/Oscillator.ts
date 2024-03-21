import Module, { IChildParams, IModule, ModuleType } from "../core/Module";

export interface IOscillator extends IModule<ModuleType.Oscillator> {}

export interface IOscillatorProps {
  wave: OscillatorType;
  frequency: number;
}

const DEFAULT_PROPS: IOscillatorProps = { wave: "sine", frequency: 440 };

export default class Oscillator extends Module<ModuleType.Oscillator> {
  constructor(params: IChildParams<ModuleType.Oscillator>) {
    const props = { ...DEFAULT_PROPS, ...params.props };
    super({ ...params, props, moduleType: ModuleType.Oscillator });
  }
}
