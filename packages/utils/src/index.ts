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

export function sleep(time: number): Promise<unknown> {
  return new Promise((resolve) => setTimeout(resolve, time));
}

export function notImplemented(message?: string): never {
  message ??= "Not implemented";
  console.error(message);
  throw Error(message);
}

export const isNumber = (value: unknown): value is number =>
  typeof value === "number" && !isNaN(value);

export const pick = <T extends object, K extends keyof T>(
  obj: T,
  keys: K[],
): Pick<T, K> => {
  return Object.fromEntries(keys.map((k) => [k, obj[k]])) as Pick<T, K>;
};

export const upperFirst = (str: string): string =>
  str.charAt(0).toUpperCase() + str.slice(1);

export function throttle<T extends (...args: any[]) => any>(
  callback: T,
  wait: number,
): (...args: Parameters<T>) => void {
  let lastCall = 0;
  return function (...args: Parameters<T>) {
    const now = Date.now();
    if (now - lastCall >= wait) {
      lastCall = now;
      callback(...args);
    }
  };
}
