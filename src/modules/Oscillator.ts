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
  isStated: boolean = false;
  detuneGain!: GainNode;

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
    });

    this.initializeGainDetune();
    this.registerInputs();
    this.registerDefaultIOs("out");
  }

  set wave(value: IOscillatorProps["wave"]) {
    this.audioNode.type = value;
  }

  set frequency(value: IOscillatorProps["frequency"]) {
    this.audioNode.frequency.value = value;
  }

  start(time: number) {
    if (this.isStated) return;

    this.isStated = true;
    this.audioNode.start(time);
  }

  stop(time: number) {
    this.audioNode.stop(time);
    this.rePlugAll(() => {
      this.audioNode = new OscillatorNode(this.context, {
        type: this.props["wave"],
        frequency: this.props["frequency"],
      });
    });

    this.isStated = false;
  }

  private initializeGainDetune() {
    this.detuneGain = new GainNode(this.context, { gain: 100 });
    this.detuneGain.connect(this.audioNode.detune);
  }

  private registerInputs() {
    this.registerAudioInput({
      name: "detune",
      getAudioNode: () => this.detuneGain,
    });
  }
}
