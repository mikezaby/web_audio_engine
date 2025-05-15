import { IAnyAudioContext, Module } from "@/core";
import { PropSchema } from "@/core/schema";
import { createModule, ICreateModule, ModuleType } from ".";
import Gain from "./Gain";
import Scale from "./Scale";

export type IFilterProps = {
  cutoff: number;
  envelopeAmount: number;
  type: BiquadFilterType;
  Q: number;
};

const MIN_FREQ = 20;
const MAX_FREQ = 20000;

const DEFAULT_PROPS: IFilterProps = {
  cutoff: MAX_FREQ,
  envelopeAmount: 0,
  type: "lowpass",
  Q: 1,
};

export const filterPropSchema: PropSchema<IFilterProps> = {
  cutoff: {
    kind: "number",
    min: MIN_FREQ,
    max: MAX_FREQ,
    step: 1,
    label: "Cutoff",
  },
  envelopeAmount: {
    kind: "number",
    min: -1,
    max: 1,
    step: 0.01,
    label: "Envelope Amount",
  },
  type: {
    kind: "enum",
    options: ["lowpass", "highpass", "bandpass"] satisfies BiquadFilterType[],
    label: "Type",
  },
  Q: {
    kind: "number",
    min: -100,
    max: 100,
    step: 0.1,
    label: "Q",
  },
};

export default class Filter extends Module<ModuleType.Filter> {
  declare audioNode: BiquadFilterNode;
  private scale: Scale;
  private amount: Gain;

  constructor(engineId: string, params: ICreateModule<ModuleType.Filter>) {
    const props = { ...DEFAULT_PROPS, ...params.props };

    const audioNodeConstructor = (context: IAnyAudioContext) =>
      new BiquadFilterNode(context, {
        type: props.type,
        frequency: props.cutoff,
        Q: props.Q,
      });

    super(engineId, {
      ...params,
      props,
      audioNodeConstructor,
    });

    this.amount = createModule(engineId, {
      name: "amount",
      moduleType: ModuleType.Gain,
      props: { gain: props.envelopeAmount },
    }) as Gain;

    this.scale = createModule(engineId, {
      name: "scale",
      moduleType: ModuleType.Scale,
      props: { min: MIN_FREQ, max: MAX_FREQ, current: this.props.cutoff },
    }) as Scale;

    this.amount.plug({ audioModule: this.scale, from: "out", to: "in" });
    this.scale.audioNode.connect(this.audioNode.frequency);

    this.registerDefaultIOs();
    this.registerInputs();
  }

  protected onSetType(value: IFilterProps["type"]) {
    this.audioNode.type = value;
  }

  protected onSetCutoff(value: IFilterProps["cutoff"]) {
    if (!this.superInitialized) return;

    this.scale.props = { current: value };
  }

  protected onSetQ(value: IFilterProps["Q"]) {
    this.audioNode.Q.value = value;
  }

  protected onSetEnvelopeAmount(value: IFilterProps["envelopeAmount"]) {
    if (!this.superInitialized) return;

    this.amount.props = { gain: value };
  }

  private registerInputs() {
    this.registerAudioInput({
      name: "cutoff",
      getAudioNode: () => this.audioNode.frequency,
    });

    this.registerAudioInput({
      name: "cutoffMod",
      getAudioNode: () => this.amount.audioNode,
    });

    this.registerAudioInput({
      name: "Q",
      getAudioNode: () => this.audioNode.Q,
    });
  }
}
