import { AnyModule } from "../../modules";
import { assertNever } from "../../utils";
import {
  AudioInput,
  AudioOutput,
  AudioInputProps,
  AudioOutputProps,
} from "./AudioIO";
import { Base, IOType } from "./Base";

export enum CollectionType {
  Input = "Input",
  Output = "Output",
}

interface IMappedIOProps {
  [CollectionType.Input]: AudioInputProps;
  [CollectionType.Output]: AudioOutputProps;
}

export default abstract class IOCollection<T extends CollectionType> {
  module: AnyModule;
  collection: Base[] = [];
  collectionType: T;

  constructor(collectionType: T, module: AnyModule) {
    this.collectionType = collectionType;
    this.module = module;
  }

  add(props: IMappedIOProps[T]) {
    let io: Base;
    this.validateUniqName(props.name);

    switch (props.ioType) {
      case IOType.AudioInput:
        io = new AudioInput(this.module, props);
        break;
      case IOType.AudioOutput:
        io = new AudioOutput(this.module, props);
        break;
      default:
        assertNever(props);
    }

    this.collection.push(io);

    return io;
  }

  unPlugAll() {
    this.collection.forEach((io) => io.unPlugAll());
  }

  rePlugAll(callback?: () => void) {
    this.collection.forEach((io) => io.rePlugAll(callback));
  }

  find(id: string) {
    const io = this.collection.find((io) => io.id === id);
    if (!io) throw Error(`The io with id ${id} is not exists`);

    return io;
  }

  findByName(name: string) {
    const io = this.collection.find((io) => io.name === name);
    if (!io) throw Error(`The io with name ${name} is not exists`);

    return io;
  }

  serialize() {
    return this.collection.map((io) => io.serialize());
  }

  private validateUniqName(name: string) {
    if (this.collection.some((io) => io.name === name)) {
      throw Error(`An io with name ${name} is already exists`);
    }
  }
}

export class InputCollection extends IOCollection<CollectionType.Input> {
  constructor(module: AnyModule) {
    super(CollectionType.Input, module);
  }
}

export class OutputCollection extends IOCollection<CollectionType.Output> {
  constructor(module: AnyModule) {
    super(CollectionType.Output, module);
  }
}
