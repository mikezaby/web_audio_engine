import { IAnyAudioContext, IModule, Module, Startable } from "@/core";
import Note from "@/core/Note";
import { nt, TTime } from "@/core/Timing/Time";
import { ICreateParams, ModuleType } from ".";

export type IOscillator = IModule<ModuleType.Oscillator>;
export type IOscillatorProps = {
  wave: OscillatorType;
  frequency: number;
};

const DEFAULT_PROPS: IOscillatorProps = { wave: "sine", frequency: 440 };

export default class Oscillator
  extends Module<ModuleType.Oscillator>
  implements Startable
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

  protected onSetWave(value: IOscillatorProps["wave"]) {
    this.audioNode.type = value;
  }

  protected onSetFrequency(value: IOscillatorProps["frequency"]) {
    this.audioNode.frequency.value = value;
  }

  start(time: TTime) {
    if (this.isStated) return;

    this.isStated = true;
    this.audioNode.start(nt(time));
  }

  stop(time: TTime) {
    this.audioNode.stop(nt(time));
    this.rePlugAll(() => {
      this.audioNode = new OscillatorNode(this.context, {
        type: this.props["wave"],
        frequency: this.props["frequency"],
      });
      this.detuneGain.connect(this.audioNode.detune);
    });

    this.isStated = false;
  }

  triggerAttack = (note: Note, triggeredAt: TTime) => {
    const triggeredAtNum = nt(triggeredAt);

    this.audioNode.frequency.setValueAtTime(note.frequency, triggeredAtNum);
    this.start(triggeredAt);
  };

  triggerRelease = () => {
    // Do nothing
  };

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
