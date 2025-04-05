import { IAnyAudioContext, IModule, Module, MidiOutput } from "@/core";
import { INote } from "@/core/Note";
import Part from "@/core/Timing/Part";
import { BarsBeatsSixteenths } from "@/core/Timing/Time";
import MidiEvent from "@/core/midi/MidiEvent";
import { ICreateParams, ModuleType } from ".";

export type IStepSequencer = IModule<ModuleType.StepSequencer>;

export interface IStepSequence {
  active: boolean;
  time: BarsBeatsSixteenths;
  notes: Omit<INote, "frequency">[];
}

export type IStepSequencerProps = {
  sequences: IStepSequence[][];
  steps: number;
  bars: number;
};

const DEFAULT_PROPS: IStepSequencerProps = {
  bars: 1,
  steps: 16,
  sequences: [],
};

export default class StepSequencer extends Module<ModuleType.StepSequencer> {
  midiOutput!: MidiOutput;
  private part!: Part;

  constructor(
    context: IAnyAudioContext,
    params: ICreateParams<ModuleType.StepSequencer>,
  ) {
    const props = { ...DEFAULT_PROPS, ...params.props };

    super(context, {
      ...params,
      props,
      audioNode: undefined,
    });

    this.initializePart();

    this.registerOutputs();
  }

  onSetSteps() {
    this.adjust();
  }

  onSetBars() {
    this.adjust();
  }

  onSetSequences() {
    this.adjust();
  }

  start(time: number) {
    this.part.start(time);
  }

  stop() {
    this.part.stop();
  }

  private registerOutputs() {
    this.midiOutput = this.registerMidiOutput({ name: "midi out" });
  }

  private initializePart() {
    this.part = new Part(this.onPartEvent, [] as IStepSequence[]);
    this.part.loop = true;
    this.part.loopEnd = this.loopEnd;
    this.adjust();
  }

  private adjust() {
    if (!this.superInitialized) return;

    this.adjustNumberOfBars();
    this.adjustNumberOfSteps();
    this.updateBarParts();
  }

  private adjustNumberOfBars() {
    const currentBar = this.props.sequences.length;
    const barsAdjustment = currentBar - this.props.bars;

    const sequences = [...this.props.sequences];

    if (barsAdjustment === 0) return;

    if (barsAdjustment > 0) {
      sequences.pop();
    } else {
      sequences.push([]);
    }

    this.props.sequences = sequences;
    this.adjustNumberOfBars();
  }

  private adjustNumberOfSteps(bar = 0) {
    if (!this.props.bars) return;

    const allSequences = [...this.props.sequences];
    const sequences = [...allSequences[bar]];
    const stepsAdjustment = sequences.length - this.props.steps;

    if (stepsAdjustment === 0) {
      if (bar === this.props.bars - 1) return;

      this.adjustNumberOfSteps(bar + 1);
      return;
    }

    if (stepsAdjustment > 0) {
      sequences.pop();
    } else {
      const index = sequences.length;
      sequences.push({ active: false, time: `${bar}:0:${index}`, notes: [] });
    }
    allSequences[bar] = sequences;
    this.props.sequences = allSequences;

    this.adjustNumberOfSteps(bar);
  }

  private updateBarParts() {
    this.part.clear();

    this.props.sequences.forEach((barSeqs) => {
      barSeqs.forEach((seq) => {
        this.part.add(seq);
      });
    });

    this.part.loopEnd = this.loopEnd;
  }

  private get loopEnd() {
    return `${this.props.bars}:0:0`;
  }

  private onPartEvent = (time: number, sequence: IStepSequence) => {
    if (!sequence.active) return;

    MidiEvent.fromSequence(sequence, time).forEach((event) => {
      this.midiOutput.onMidiEvent(event);
    });
  };
}
