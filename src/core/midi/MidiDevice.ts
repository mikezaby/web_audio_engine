import MidiEvent from "./MidiEvent";

export type TMidiPortState = "connected" | "disconnected";

export interface MidiDeviceInterface {
  id: string;
  name: string;
  state: TMidiPortState;
}

export interface IMidiInput extends MidiDeviceInterface {
  onmidimessage: ((e: MidiEvent) => void) | null;
}

export type EventListerCallback = (event: MidiEvent) => void;

export default class MidiDevice implements MidiDeviceInterface {
  id: string;
  name: string;
  state: TMidiPortState;
  eventListerCallbacks: EventListerCallback[] = [];

  private _midi: IMidiInput;

  constructor(midi: IMidiInput) {
    this.id = midi.id;
    this.name = midi.name || `Device ${midi.id}`;
    this.state = midi.state;
    this._midi = midi;

    this.connect();
  }

  connect() {
    this._midi.onmidimessage = (e: Event | MidiEvent) => {
      const isMidiEvent =
        e instanceof MIDIMessageEvent || e instanceof MidiEvent;

      if (!isMidiEvent) return;

      this.processEvent(e);
    };
  }

  disconnect() {
    this._midi.onmidimessage = null;
  }

  serialize() {
    const { id, name, state } = this;

    return { id, name, state };
  }

  addEventListener(callback: EventListerCallback) {
    this.eventListerCallbacks.push(callback);
  }

  removeEventListener(callback: EventListerCallback) {
    this.eventListerCallbacks = this.eventListerCallbacks.filter(
      (c) => c !== callback,
    );
  }

  private processEvent(e: MIDIMessageEvent | MidiEvent) {
    const event: MidiEvent = e instanceof MidiEvent ? e : new MidiEvent(e);

    switch (event.type) {
      case "noteOn":
      case "noteOff":
        this.eventListerCallbacks.forEach((callback) => callback(event));
    }
  }
}
