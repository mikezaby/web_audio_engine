import { IAnyAudioContext, IModule, Module } from "@/core";
import { CustomWorklet, newAudioWorklet } from "@/processors";
import { ICreateParams, ModuleType } from ".";

export type IScale = IModule<ModuleType.Scale>;
export type IScaleProps = {
  min: number;
  max: number;
  current: number;
};

const DEFAULT_PROPS: IScaleProps = { min: 0, max: 1, current: 0.5 };

export default class Scale extends Module<ModuleType.Scale> {
  declare audioNode: AudioWorkletNode;

  constructor(
    context: IAnyAudioContext,
    params: ICreateParams<ModuleType.Scale>,
  ) {
    const props = { ...DEFAULT_PROPS, ...params.props };
    const audioNode = newAudioWorklet(context, CustomWorklet.ScaleProcessor);

    super(context, {
      ...params,
      props,
      audioNode,
    });

    this.registerDefaultIOs();
  }

  protected onSetMin(value: number) {
    this.audioNode.parameters.get("min")!.value = value;
  }

  protected onSetMax(value: number) {
    this.audioNode.parameters.get("max")!.value = value;
  }

  protected onSetCurrent(value: number) {
    this.audioNode.parameters.get("current")!.value = value;
  }
}
