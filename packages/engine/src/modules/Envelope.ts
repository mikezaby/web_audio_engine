import { IAnyAudioContext, Module } from "@/core";
import Note from "@/core/Note";
import { nt, TTime } from "@/core/Timing/Time";
import { createScaleNormalized } from "@/utils";
import { ICreateParams, ModuleType } from ".";

export interface IEnvelopeProps {
  attack: number;
  decay: number;
  sustain: number;
  release: number;
}

const DEFAULT_PROPS: IEnvelopeProps = {
  attack: 0.1,
  decay: 0.2,
  sustain: 0,
  release: 0.3,
};

const scaleToTen = createScaleNormalized({
  min: 0.001,
  max: 10,
});

const scaleToFive = createScaleNormalized({
  min: 0.001,
  max: 5,
});

export default class Envelope extends Module<ModuleType.Envelope> {
  declare audioNode: GainNode;
  currentNote?: Note;

  constructor(
    context: IAnyAudioContext,
    params: ICreateParams<ModuleType.Envelope>,
  ) {
    const props = { ...DEFAULT_PROPS, ...params.props };
    const audioNode = new GainNode(context);
    audioNode.gain.value = 0;

    super(context, {
      ...params,
      props,
      audioNode,
    });

    this.registerDefaultIOs();
  }

  triggerAttack = (note: Note, triggeredAt: TTime) => {
    this.currentNote = note;

    const attack = this.scaledAttack();
    const decay = this.scaledDecay();
    const sustain = this.props.sustain;
    const triggeredAtNum = nt(triggeredAt);

    this.audioNode.gain.cancelAndHoldAtTime(triggeredAtNum);

    if (this.audioNode.gain.value === 0) {
      this.audioNode.gain.setValueAtTime(0.001, triggeredAtNum);
    }

    // Attack
    this.audioNode.gain.exponentialRampToValueAtTime(
      1.0,
      triggeredAtNum + attack,
    );
    // Decay
    this.audioNode.gain.exponentialRampToValueAtTime(
      sustain || 0.001,
      triggeredAtNum + (attack + decay),
    );

    this.audioNode.gain.setValueAtTime(
      sustain,
      triggeredAtNum + (attack + decay),
    );
  };

  triggerRelease = (note: Note, triggeredAt: TTime) => {
    if (note.fullName !== this.currentNote?.fullName) return;

    const release = this.scaledRelease();
    const triggeredAtNum = nt(triggeredAt);

    this.audioNode.gain.cancelAndHoldAtTime(triggeredAtNum);
    this.audioNode.gain.exponentialRampToValueAtTime(
      0.001,
      triggeredAtNum + release - 0.01,
    );
    this.audioNode.gain.setValueAtTime(0, triggeredAtNum + release);
    this.currentNote = undefined;
  };

  private scaledAttack() {
    return scaleToTen(this.props.attack);
  }

  private scaledDecay() {
    return scaleToFive(this.props.decay);
  }

  private scaledRelease() {
    return scaleToTen(this.props.release);
  }
}
