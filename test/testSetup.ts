import { afterEach, beforeEach } from "vitest";
import { loadProcessors } from "@/processors";
import "@/utils/nodePolyfill";

declare module "vitest" {
  export interface TestContext {
    audioContext: AudioContext;
  }
}

beforeEach(async (ctx) => {
  ctx.audioContext = new AudioContext();
  await ctx.audioContext.resume();
  await loadProcessors(ctx.audioContext);
});

afterEach(async (ctx) => {
  await ctx.audioContext.close();
});
