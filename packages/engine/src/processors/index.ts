import { assertNever } from "@blibliki/utils";
import { IAnyAudioContext } from "@/core";
import { scaleProcessorURL } from "./scale-processor";

export enum CustomWorklet {
  ScaleProcessor = "ScaleProcessor",
}

export async function loadProcessors(context: IAnyAudioContext) {
  await context.audioWorklet.addModule(scaleProcessorURL);
}

export function newAudioWorklet(
  context: IAnyAudioContext,
  worklet: CustomWorklet,
) {
  switch (worklet) {
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
    case CustomWorklet.ScaleProcessor:
      return new AudioWorkletNode(context, "scale-processor");
    default:
      assertNever(worklet);
  }
}
