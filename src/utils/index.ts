import { Engine } from "@/Engine";

export { deterministicId } from "./deterministicId";
export type { AtLeast, Optional, EmptyObject } from "./types";

export function assertNever(value: never, message?: string): never {
  console.error("Unknown value", value);
  message ??= "Not possible value";
  throw Error(message);
}

export function uuidv4() {
  return crypto.randomUUID();
}

export function now() {
  return Engine.current.context.currentTime;
}

export function browserToContextTime(time: number): number {
  const differenceBetweenClocks = performance.now() / 1000 - now();
  return time / 1000 - differenceBetweenClocks;
}
