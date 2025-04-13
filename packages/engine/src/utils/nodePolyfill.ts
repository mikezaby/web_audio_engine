import {
  AudioContext,
  AnalyserNode,
  AudioParam,
  AudioNode,
  AudioWorkletNode,
  BiquadFilterNode,
  GainNode,
  OfflineAudioContext,
  OscillatorNode,
  ConstantSourceNode,
  WaveShaperNode,
} from "node-web-audio-api";

globalThis.AudioContext = AudioContext;
globalThis.OfflineAudioContext = OfflineAudioContext;
globalThis.AudioParam = AudioParam;
globalThis.AudioNode = AudioNode;
globalThis.AudioWorkletNode = AudioWorkletNode;
globalThis.AnalyserNode = AnalyserNode;
globalThis.GainNode = GainNode;
globalThis.OscillatorNode = OscillatorNode;
globalThis.BiquadFilterNode = BiquadFilterNode;
globalThis.ConstantSourceNode = ConstantSourceNode;
globalThis.WaveShaperNode = WaveShaperNode;
