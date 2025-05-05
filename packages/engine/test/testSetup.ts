import { afterEach, beforeEach } from "vitest";
import "@/nodePolyfill";
import { loadProcessors } from "@/processors";

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
