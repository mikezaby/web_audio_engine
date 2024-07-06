import { Note as WMNote } from "webmidi";

export interface INote {
  note: string;
  frequency: number;
  duration: string;
  velocity?: number;
}

export default class Note {
  static _notes: Note[];
  name!: string;
  octave!: number;
  velocity: number = 1;
  duration!: string;
  frequency!: number;
  wmNote!: WMNote;

  constructor(
    eventOrString: Partial<INote> | MIDIMessageEvent | string | number,
  ) {
    if (typeof eventOrString === "number") {
      this.fromFrequency(eventOrString);
    } else if (typeof eventOrString === "string") {
      this.fromString(eventOrString);
    } else if (eventOrString instanceof MIDIMessageEvent) {
      this.fromEvent(eventOrString);
    } else {
      this.fromProps(eventOrString);
    }
  }

  get isSemi() {
    return this.name.slice(-1) === "#";
  }

  get fullName() {
    return `${this.name}${this.octave}`;
  }

  midiData(noteOn: boolean = true): Uint8Array {
    const statusByte = noteOn ? 0x90 : 0x80;
    return new Uint8Array([statusByte, 0, this.velocity * 100]);
  }

  get midiNumber(): number {}

  valueOf() {
    return this.fullName;
  }

  serialize(): INote {
    return {
      note: this.fullName,
      frequency: this.frequency,
      velocity: this.velocity,
      duration: this.duration,
    };
  }

  private fromFrequency(frequency: number) {
    this.frequency = frequency;
  }

  private fromString(string: string) {
    const matches = string.match(/(\w#?)(\d)?/) || [];

    this.name = matches[1];
    this.octave = matches[2] ? parseInt(matches[2]) : 1;
  }

  private fromEvent(event: MIDIMessageEvent) {
    this.name = Notes[event.data[1] % 12];
    this.octave = Math.floor(event.data[1] / 12) - 2;
  }

  private fromProps(props: Partial<INote>) {
    Object.assign(this, props);
    if (!props.note) throw Error("note props is mandatory");

    this.fromString(props.note);
  }
}
