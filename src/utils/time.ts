import { Engine } from "@/Engine";

export function now() {
  return Engine.current.context.currentTime;
}

export function browserToContextTime(time: number): number {
  const differenceBetweenClocks = performance.now() / 1000 - now();
  return time / 1000 - differenceBetweenClocks;
}
