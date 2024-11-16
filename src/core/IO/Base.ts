import { AnyModule } from "@/modules";
import { deterministicId } from "@/utils";

export interface IOProps {
  name: string;
  ioType: IOType;
}

export interface IIOSerialize extends IOProps {
  id: string;
  moduleId: string;
}

export enum IOType {
  AudioInput = "audioInput",
  AudioOutput = "audioOutput",
}

export interface IIO extends IOProps {
  id: string;
  module: AnyModule;
}

export abstract class Base implements IIO {
  id: string;
  ioType: IOType;
  name: string;
  module: AnyModule;
  connections: Base[];

  constructor(module: AnyModule, props: IOProps) {
    this.module = module;
    this.name = props.name;
    this.ioType = props.ioType;
    this.id = deterministicId(this.module.id, this.name);
    this.connections = [];
  }

  plug(io: Base, plugOther: boolean = true) {
    this.connections.push(io);
    if (plugOther) io.plug(this, false);
  }

  unPlug(io: Base, plugOther: boolean = true) {
    this.connections = this.connections.filter(
      (currentIO) => currentIO.id !== io.id,
    );
    if (plugOther) io.unPlug(this, false);
  }

  rePlugAll(callback?: () => void) {
    const connections = this.connections;
    this.unPlugAll();
    if (callback) callback();

    connections.forEach((otherIO) => {
      this.plug(otherIO);
    });
  }

  unPlugAll() {
    this.connections.forEach((otherIO) => {
      this.unPlug(otherIO);
    });
  }

  serialize(): IIOSerialize {
    return {
      id: this.id,
      name: this.name,
      ioType: this.ioType,
      moduleId: this.module.id,
    };
  }
}

export default abstract class IO<Connection extends Base> extends Base {
  declare connections: Connection[];

  plug(io: Connection, plugOther?: boolean): void {
    super.plug(io, plugOther);
  }

  unPlug(io: Connection, plugOther?: boolean): void {
    super.unPlug(io, plugOther);
  }
}
