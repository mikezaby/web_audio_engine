import {
  AudioContext,
  IAudioContext,
  IOfflineAudioContext,
  OfflineAudioContext,
} from "standardized-audio-context";

export type IAnyAudioContext = IAudioContext | IOfflineAudioContext;

let globalContext: IAnyAudioContext;

export function getContext(): IAnyAudioContext {
  if (globalContext) return globalContext;

  setNewAudioContext();

  return globalContext;
}

export function setNewAudioContext() {
  const context = new AudioContext();
  setContext(context);
}

interface OfflineAudioContextProps {
  length: number;
  sampleRate: number;
}

export function setNewOfflineAudioContext(props: OfflineAudioContextProps) {
  const context = new OfflineAudioContext(props);
  setContext(context);
}

function setContext(context: IAnyAudioContext) {
  globalContext = context;
}
