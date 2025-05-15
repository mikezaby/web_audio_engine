import { IAnyAudioContext, IModule, Module } from "@/core";
import { PropSchema } from "@/core/schema";
import { ICreateModule, ModuleType } from ".";

export type IGain = IModule<ModuleType.Gain>;
export type IGainProps = {
  gain: number;
};

export const gainPropSchema: PropSchema<IGainProps> = {
  gain: {
    kind: "number",
    min: 0,
    max: 1,
    step: 0.01,
    label: "Gain",
  },
};

const DEFAULT_PROPS: IGainProps = { gain: 1 };

export default class Gain extends Module<ModuleType.Gain> {
  declare audioNode: GainNode;

  constructor(engineId: string, params: ICreateModule<ModuleType.Gain>) {
    const props = { ...DEFAULT_PROPS, ...params.props };
    const audioNodeConstructor = (context: IAnyAudioContext) =>
      new GainNode(context);

    super(engineId, {
      ...params,
      audioNodeConstructor,
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
