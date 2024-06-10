import IO, { IOProps, IOType } from "./Base";
import { AnyModule } from "../../modules";

export type MidiIO = MidiInput | MidiOutput;

export interface MidiInputProps extends IOProps {
  ioType: IOType.MidiInput;
  onMidiEvent: () => void;
}

export interface MidiOutputProps extends IOProps {
  ioType: IOType.MidiOutput;
}

export class MidiInput extends IO<MidiOutput> implements MidiInputProps {
  declare ioType: IOType.MidiInput;
  onMidiEvent: MidiInputProps["onMidiEvent"];

  constructor(module: AnyModule, props: MidiInputProps) {
    super(module, props);
    this.onMidiEvent = props.onMidiEvent;
  }
}

export class MidiOutput extends IO<MidiInput> implements MidiOutputProps {
  declare ioType: IOType.MidiOutput;

  constructor(module: AnyModule, props: MidiOutputProps) {
    super(module, props);
  }

  onMidiEvent = () => {};
}
