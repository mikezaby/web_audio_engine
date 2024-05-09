import { ModuleType, ModuleTypeToPropsMapping } from "../modules";
import { Optional } from "../utils/types";
import { v4 as uuidv4 } from "uuid";
import { IAnyAudioContext } from ".";
import {
  AudioInputProps,
  AudioOutputProps,
  IIOSerialize,
  IOType,
  InputCollection,
  OutputCollection,
} from "./IO";

export interface IModule<T extends ModuleType> {
  id: string;
  name: string;
  moduleType: T;
  props: ModuleTypeToPropsMapping[T];
}

export interface IModuleSerialize<T extends ModuleType> extends IModule<T> {
  inputs: IIOSerialize[];
  outputs: IIOSerialize[];
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
  inputs: InputCollection;
  outputs: OutputCollection;
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

    this.inputs = new InputCollection(this);
    this.outputs = new OutputCollection(this);
  }

  get props(): ModuleTypeToPropsMapping[T] {
    return this._props;
  }

  set props(value: Partial<ModuleTypeToPropsMapping[T]>) {
    this._props = { ...this._props, ...value };
    Object.assign(this, value);
  }

  serialize(): IModuleSerialize<T> {
    return {
      id: this.id,
      name: this.name,
      moduleType: this.moduleType,
      props: this.props,
      inputs: this.inputs.serialize(),
      outputs: this.outputs.serialize(),
    };
  }

  protected rePlugAll(callback?: () => void) {
    this.inputs.rePlugAll(callback);
    this.outputs.rePlugAll(callback);
  }

  protected unPlugAll() {
    this.inputs.unPlugAll();
    this.outputs.unPlugAll();
  }

  protected registerDefaultIOs(value: "both" | "in" | "out" = "both") {
    if (value === "in" || value === "both") {
      this.registerAudioInput({
        name: "in",
        getAudioNode: () => this.audioNode,
      });
    }

    if (value === "out" || value === "both") {
      this.registerAudioOutput({
        name: "out",
        getAudioNode: () => this.audioNode,
      });
    }
  }

  protected registerAudioInput(props: Omit<AudioInputProps, "ioType">) {
    this.inputs.add({ ...props, ioType: IOType.AudioInput });
  }

  protected registerAudioOutput(props: Omit<AudioOutputProps, "ioType">) {
    this.outputs.add({ ...props, ioType: IOType.AudioOutput });
  }
}
