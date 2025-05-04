import { IAnyAudioContext, IModule, Module } from "@/core";
import { ICreateParams, ModuleType } from ".";

export type IGain = IModule<ModuleType.Gain>;
export type IGainProps = {
  gain: number;
};

const DEFAULT_PROPS: IGainProps = { gain: 1 };

export default class Gain extends Module<ModuleType.Gain> {
  declare audioNode: GainNode;

  constructor(
    context: IAnyAudioContext,
    params: ICreateParams<ModuleType.Gain>,
  ) {
    const props = { ...DEFAULT_PROPS, ...params.props };
    const audioNode = new GainNode(context);

    super(context, {
      ...params,
      audioNode,
      props,
    });

    this.registerDefaultIOs();
    this.registerAdditionalInputs();
  }

  protected onSetGain(value: IGainProps["gain"]) {
    this.audioNode.gain.value = value;
  }

  private registerAdditionalInputs() {
    this.registerAudioInput({
      name: "gain",
      getAudioNode: () => this.audioNode.gain,
    });
  }
}
