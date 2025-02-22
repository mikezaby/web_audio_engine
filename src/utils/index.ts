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

enum ScaleType {
  linear = "LINEAR",
  exponential = "EXPONENTIAL",
}

export function scaleNormalized({
  value,
  min,
  max,
  type = ScaleType.linear,
}: {
  value: number;
  min: number;
  max: number;
  type?: ScaleType;
}): number {
  if (type === ScaleType.linear) {
    return min + (max - min) * value;
  }

  return min * Math.pow(max / min, value);
}

export function createScaleNormalized({
  min,
  max,
  type = ScaleType.linear,
}: {
  min: number;
  max: number;
  type?: ScaleType;
}): (value: number) => number {
  return (value: number) => scaleNormalized({ value, min, max, type });
}
