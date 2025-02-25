import { IAnyAudioContext, Module } from "@/core";
import { createModule, ICreateParams, ModuleType } from ".";
import Scale from "./Scale";

export interface IFilterProps {
  cutoff: number;
  envelopeAmount: number;
  type: BiquadFilterType;
}

const MIN_FREQ = 20;
const MAX_FREQ = 20000;

const DEFAULT_PROPS: IFilterProps = {
  cutoff: MAX_FREQ,
  envelopeAmount: 1,
  type: "lowpass",
};

export default class FilterModule extends Module<ModuleType.Filter> {
  declare audioNode: BiquadFilterNode;
  private scale: Scale;

  constructor(
    context: IAnyAudioContext,
    params: ICreateParams<ModuleType.Filter>,
  ) {
    const props = { ...DEFAULT_PROPS, ...params.props };

    const audioNode = new BiquadFilterNode(context, {
      type: props.type,
      frequency: props.cutoff,
    });

    super(context, {
      ...params,
      props,
      audioNode,
    });

    this.scale = createModule(context, {
      name: "scale",
      moduleType: ModuleType.Scale,
      props: { min: MIN_FREQ, max: MAX_FREQ, current: this.props["cutoff"] },
    }) as Scale;
    this.scale.audioNode.connect(this.audioNode.frequency);

    this.registerDefaultIOs();
    this.registerInputs();
  }

  protected onSetCutoff(value: IFilterProps["cutoff"]) {
    if (!this.superInitialized) return;

    this.scale.props = { current: value };
  }

  private registerInputs() {
    this.registerAudioInput({
      name: "cutoff",
      getAudioNode: () => this.scale.audioNode,
    });
  }
}
