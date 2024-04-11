import { ICreateParams, ModuleType } from ".";
import Module, { IModule } from "../core/Module";
import { IAnyAudioContext } from "../core";
import { IAudioDestinationNode } from "standardized-audio-context";

export interface IMaster extends IModule<ModuleType.Master> {}

export interface IMasterProps {}
const DEFAULT_PROPS: IMasterProps = {};

export default class Master extends Module<ModuleType.Master> {
  declare audioNode: IAudioDestinationNode<IAnyAudioContext>;

  constructor(params: ICreateParams<ModuleType.Master>) {
    const props = { ...DEFAULT_PROPS, ...params.props };
    const audioNode = (context: IAnyAudioContext) => context.destination;

    super({ ...params, audioNode, props });
  }
}
