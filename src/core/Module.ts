import { AnyModule, ModuleType, ModuleTypeToPropsMapping } from "../modules";
import { Optional } from "../utils/types";
import { v4 as uuidv4 } from "uuid";
import { IAnyAudioContext } from ".";

export interface IModule<T extends ModuleType> {
  id: string;
  name: string;
  moduleType: T;
  props: ModuleTypeToPropsMapping[T];
}

export interface Startable {
  start(time: number): void;
  stop(time: number): void;
}

interface IModuleConstructor<T extends ModuleType>
  extends Optional<IModule<T>, "id"> {
  audioNode: AudioNode;
}

export default abstract class Module<T extends ModuleType>
  implements IModule<T>
{
  id: string;
  name: string;
  moduleType: T;
  context: IAnyAudioContext;
  audioNode: AudioNode;
  protected _props!: ModuleTypeToPropsMapping[T];

  constructor(context: IAnyAudioContext, params: IModuleConstructor<T>) {
    const { id, name, moduleType, audioNode, props } = params;

    this.id = id || uuidv4();
    this.name = name;
    this.moduleType = moduleType;
    this.context = context;
    this.audioNode = audioNode;
    this._props = {} as ModuleTypeToPropsMapping[T];
    this.props = props;
  }

  get props(): ModuleTypeToPropsMapping[T] {
    return this._props;
  }

  set props(value: Partial<ModuleTypeToPropsMapping[T]>) {
    this._props = { ...this._props, ...value };
    Object.assign(this, value);
  }

  connect(module: AnyModule) {
    this.audioNode.connect(module.audioNode);
  }

  serialize(): IModule<T> {
    return {
      id: this.id,
      name: this.name,
      moduleType: this.moduleType,
      props: this.props,
    };
  }
}
