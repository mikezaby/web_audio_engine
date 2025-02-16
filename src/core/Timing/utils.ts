import { Engine } from "@/Engine";

const LOOK_AHEAD = 0.01;

export function realNow(time: number = 0) {
  if (!Engine.hasEngine) return 0;

  return Engine.current.context.currentTime + time;
}

export function now(time: number = 0) {
  return realNow() + LOOK_AHEAD + time;
}
