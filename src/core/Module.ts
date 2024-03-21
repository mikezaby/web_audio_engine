import { ModuleType, ModuleTypeToPropsMapping } from "../modules";
import { Optional } from "../utils/types";
import { v4 as uuidv4 } from "uuid";

export interface IModule<T extends ModuleType> {
  id: string;
  name: string;
  moduleType: T;
  props: ModuleTypeToPropsMapping[T];
}

export default abstract class Module<T extends ModuleType>
  implements IModule<T>
{
  id: string;
  name: string;
  moduleType: T;
  protected _props!: ModuleTypeToPropsMapping[T];

  constructor(params: Optional<IModule<T>, "id">) {
    const { id, name, moduleType, props } = params;

    this.id = id || uuidv4();
    this.name = name;
    this.moduleType = moduleType;
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

  serialize(): IModule<T> {
    return {
      id: this.id,
      name: this.name,
      moduleType: this.moduleType,
      props: this.props,
    };
  }
}
