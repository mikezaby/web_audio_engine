import { Message } from "webmidi";
import { now } from "@/utils";
import Note, { INote } from "../Note";

export enum MidiEventType {
  noteOn = "noteon",
  noteOff = "noteoff",
  cc = "cc",
}

export default class MidiEvent {
  note?: Note;
  readonly triggeredAt: number;
  private message: Message;

  static fromNote(
    noteName: string | Note | INote,
    noteOn: boolean = true,
    triggeredAt?: number,
  ): MidiEvent {
    const note = noteName instanceof Note ? noteName : new Note(noteName);

    return new MidiEvent(new Message(note.midiData(noteOn)), triggeredAt);
  }

  static fromCC(cc: number, value: number, triggeredAt?: number): MidiEvent {
    return new MidiEvent(
      new Message(new Uint8Array([0xb0, cc, value])),
      triggeredAt,
    );
  }

  constructor(message: Message, triggeredAt?: number) {
    this.message = message;
    this.triggeredAt = triggeredAt || now();
    this.defineNotes();
  }

  get type() {
    return this.message.type as MidiEventType;
  }

  get isNote() {
    return (
      this.type === MidiEventType.noteOn || this.type === MidiEventType.noteOff
    );
  }

  defineNotes() {
    if (!this.isNote) return;
    if (this.note) return;

    this.note = Note.fromEvent(this.message);
  }
}
