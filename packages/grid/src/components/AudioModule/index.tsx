import { useAppDispatch } from "@/hooks";
import { AnyObject } from "@/types";
import BitCrusher from "./BitCrusher";
import Delay from "./Delay";
import Distortion from "./Distortion";
import Envelope from "./Envelope";
import Filter from "./Filter";
import Keyboard from "./Keyboard";
import LFO from "./LFO";
import Master from "./Master";
import MidiDeviceSelector from "./MidiDeviceSelector";
import Oscillator from "./Oscillator";
import Reverb from "./Reverb";
import Sequencer from "./Sequencer";
import VoiceScheduler from "./VoiceScheduler";
import Volume from "./Volume";
import { updateModule } from "./modulesSlice";

export interface AudioModuleProps {
  id: string;
  name: string;
  type: string;
  props?: AnyObject;
}

export type TUpdateProps = (id: string, props?: object) => void;

export default function AudioModule(audioModuleProps: {
  audioModule: AudioModuleProps;
  componentType?: string;
}) {
  const dispatch = useAppDispatch();

  const { id, name, type, props } = audioModuleProps.audioModule;

  let Component;

  const updateProps = (id: string, props: object) => {
    dispatch(updateModule({ id, changes: { props } }));
  };

  switch (type) {
    case "Master":
      Component = Master;
      break;
    case "Oscillator":
      Component = Oscillator;
      break;
    case "Filter":
      Component = Filter;
      break;
    case "Volume":
      Component = Volume;
      break;
    case "Envelope":
    case "AmpEnvelope":
    case "FreqEnvelope":
      Component = Envelope;
      break;
    case "MidiSelector":
      Component = MidiDeviceSelector;
      break;
    case "VoiceScheduler":
      Component = VoiceScheduler;
      break;
    case "VirtualMidi":
      Component = Keyboard;
      break;
    case "Reverb":
      Component = Reverb;
      break;
    case "Delay":
      Component = Delay;
      break;
    case "Distortion":
      Component = Distortion;
      break;
    case "BitCrusher":
      Component = BitCrusher;
      break;
    case "Sequencer":
      Component = Sequencer;
      break;
    case "LFO":
      Component = LFO;
      break;
    default:
      throw Error(`Unknown audio module type ${type}`);
  }

  return (
    <Component id={id} name={name} props={props} updateProps={updateProps} />
  );
}
