import IO, { IOProps, IOType } from "./Base";
import { AnyModule } from "@/modules";

export type AudioIO = AudioInput | AudioOutput;

export interface AudioInputProps extends IOProps {
  ioType: IOType.AudioInput;
  getAudioNode: () => AudioNode | AudioParam | AudioDestinationNode;
}

export interface AudioOutputProps extends IOProps {
  ioType: IOType.AudioOutput;
  getAudioNode: () => AudioNode;
}

export class AudioInput extends IO<AudioOutput> implements AudioInputProps {
  declare ioType: IOType.AudioInput;
  getAudioNode: AudioInputProps["getAudioNode"];

  constructor(module: AnyModule, props: AudioInputProps) {
    super(module, props);
    this.getAudioNode = props.getAudioNode;
  }
}

export class AudioOutput extends IO<AudioInput> implements AudioOutputProps {
  declare ioType: IOType.AudioOutput;
  getAudioNode!: AudioOutputProps["getAudioNode"];

  constructor(module: AnyModule, props: AudioOutputProps) {
    super(module, props);
    this.getAudioNode = props.getAudioNode;
  }

  plug(io: AudioInput, plugOther: boolean = true) {
    super.plug(io, plugOther);
    const input = io.getAudioNode();

    if (input instanceof AudioParam) {
      this.getAudioNode().connect(input);
    } else {
      this.getAudioNode().connect(input);
    }
  }

  unPlug(io: AudioInput, plugOther: boolean = true) {
    super.unPlug(io, plugOther);
    const input = io.getAudioNode();

    try {
      if (input instanceof AudioParam) {
        this.getAudioNode().disconnect(input);
      } else {
        this.getAudioNode().disconnect(input);
      }
    } catch (e) {
      console.error(e);
    }
  }
}
