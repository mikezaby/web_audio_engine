import { IAnyAudioContext } from "@/core";
import { assertNever } from "@/utils";
import { ScaleProcessorSource } from "./scale-processor";

export enum CustomWorklet {
  ScaleProcessor = "ScaleProcessor",
}

export async function loadProcessors(context: IAnyAudioContext) {
  await loadAudioWorklet(context, ScaleProcessorSource);
}

export async function loadAudioWorklet(
  context: IAnyAudioContext,
  workletSource: string,
) {
  const blob = new Blob([workletSource], { type: "application/javascript" });
  const blobURL = URL.createObjectURL(blob);

  await context.audioWorklet.addModule(blobURL);
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
