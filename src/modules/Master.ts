import { ICreateParams, ModuleType } from ".";
import Module, { IModule } from "../core/Module";
import { IAnyAudioContext } from "../core";

export interface IMaster extends IModule<ModuleType.Master> {}

export interface IMasterProps {}
const DEFAULT_PROPS: IMasterProps = {};

export default class Master extends Module<ModuleType.Master> {
  declare audioNode: AudioDestinationNode;

  constructor(
    context: IAnyAudioContext,
    params: ICreateParams<ModuleType.Master>,
  ) {
    const props = { ...DEFAULT_PROPS, ...params.props };
    const audioNode = context.destination;

    super(context, { ...params, audioNode, props });
  }
}
