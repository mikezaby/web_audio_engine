import { ICreateParams, ModuleType } from ".";
import Module, { IModule } from "../core/Module";
import { IAnyAudioContext } from "../core";

export interface IVolume extends IModule<ModuleType.Volume> {}

export interface IVolumeProps {
  volume: number;
}

const DEFAULT_PROPS: IVolumeProps = { volume: 100 };

export default class Volume
  extends Module<ModuleType.Volume>
  implements IVolumeProps
{
  declare audioNode: GainNode;

  constructor(
    context: IAnyAudioContext,
    params: ICreateParams<ModuleType.Volume>,
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

  set volume(value: IVolumeProps["volume"]) {
    this.audioNode.gain.value = value;
  }

  private registerAdditionalInputs() {
    this.registerAudioInput({
      name: "volume",
      getAudioNode: () => this.audioNode.gain,
    });
  }
}
