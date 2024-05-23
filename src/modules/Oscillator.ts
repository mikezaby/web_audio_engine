import { ICreateParams, ModuleType } from ".";
import { IAnyAudioContext } from "../core";
import Module, { IModule, Startable } from "../core/Module";

export interface IOscillator extends IModule<ModuleType.Oscillator> {}

export interface IOscillatorProps {
  wave: OscillatorType;
  frequency: number;
}

const DEFAULT_PROPS: IOscillatorProps = { wave: "sine", frequency: 440 };

export default class Oscillator
  extends Module<ModuleType.Oscillator>
  implements IOscillatorProps, Startable
{
  declare audioNode: OscillatorNode;

  constructor(
    context: IAnyAudioContext,
    params: ICreateParams<ModuleType.Oscillator>,
  ) {
    const props = { ...DEFAULT_PROPS, ...params.props };
    const audioNode = new OscillatorNode(context);

    super(context, {
      ...params,
      props,
      audioNode,
      moduleType: ModuleType.Oscillator,
    });
  }

  set wave(value: IOscillatorProps["wave"]) {
    this.audioNode.type = value;
  }

  set frequency(value: IOscillatorProps["frequency"]) {
    this.audioNode.frequency.value = value;
  }

  start(time: number) {
    this.audioNode.start(time);
  }

  stop(time: number) {
    this.audioNode.stop(time);

    // After stop we create new oscillator as we cant start again the same oscillator
    this.audioNode = new OscillatorNode(this.context, {
      type: this.props["wave"],
      frequency: this.props["frequency"],
    });
  }
}
