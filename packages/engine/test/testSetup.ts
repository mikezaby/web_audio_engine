import { afterEach, beforeEach } from "vitest";
import { Engine } from "@/Engine";
import "@/nodePolyfill";

declare module "vitest" {
  export interface TestContext {
    audioContext: AudioContext;
    engine: Engine;
  }
}

beforeEach(async (ctx) => {
  ctx.audioContext = new AudioContext();
  ctx.engine = new Engine(ctx.audioContext);
  await ctx.engine.initialize();
  await ctx.engine.resume();
});

afterEach(async (ctx) => {
  await ctx.audioContext.close();
  ctx.engine.dispose();
});
