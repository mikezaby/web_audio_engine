import { IAnyAudioContext, IModule, Module, MidiOutput } from "@/core";
import MidiEvent from "@/core/midi/MidiEvent";
import { ICreateParams, ModuleType } from ".";

export type IMidiSelector = IModule<ModuleType.MidiSelector>;
export type IMidiSelectorProps = {
  selectedId: string | null;
};

const DEFAULT_PROPS: IMidiSelectorProps = { selectedId: null };

export default class MidiSelector
  extends Module<ModuleType.MidiSelector>
  implements IMidiSelector
{
  midiOutput!: MidiOutput;
  _forwardMidiEvent?: (midiEvent: MidiEvent) => void;

  constructor(
    context: IAnyAudioContext,
    params: ICreateParams<ModuleType.MidiSelector>,
  ) {
    const props = { ...DEFAULT_PROPS, ...params.props };

    super(context, {
      ...params,
      props,
      audioNode: undefined,
    });

    this.registerOutputs();
  }

  set selectedId(value: string | null) {
    this.removeEventListener();
    this.addEventListener(value);
  }

  private get forwardMidiEvent() {
    if (this._forwardMidiEvent) return this._forwardMidiEvent;

    this._forwardMidiEvent = (midiEvent: MidiEvent) => {
      this.midiOutput.onMidiEvent(midiEvent);
    };

    return this._forwardMidiEvent;
  }

  private addEventListener(midiId: string | null) {
    if (!midiId) return;

    const midiDevice = this.engine.findMidiDevice(midiId);
    midiDevice?.addEventListener(this.forwardMidiEvent);
  }

  private removeEventListener() {
    if (!this.selectedId) return;

    const midiDevice = this.engine.findMidiDevice(this.selectedId);
    midiDevice?.removeEventListener(this.forwardMidiEvent);
  }

  private registerOutputs() {
    this.midiOutput = this.registerMidiOutput({ name: "midi out" });
  }
}
