export { deterministicId } from "./deterministicId";
export type { AtLeast, Optional, EmptyObject } from "./types";
export { deepmerge } from "deepmerge-ts";

export function assertNever(value: never, message?: string): never {
  console.error("Unknown value", value);
  message ??= "Not possible value";
  throw Error(message);
}

type UnlessUndefined<T> = T extends undefined ? never : T;

export function assertDefined<T>(
  value: T | undefined,
): asserts value is UnlessUndefined<T> {
  if (value === undefined) {
    throw new Error("Value is undefined");
  }
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
  const result = {} as Pick<T, K>;
  for (const key of keys) {
    if (Object.prototype.hasOwnProperty.call(obj, key)) {
      result[key] = obj[key];
    }
  }
  return result;
};

export const upperFirst = (str: string): string =>
  str.charAt(0).toUpperCase() + str.slice(1);

export function throttle<T extends (...args: unknown[]) => unknown>(
  callback: T,
  wait: number,
): (...args: Parameters<T>) => void {
  let lastCall = 0;
  return function (...args: Parameters<T>): void {
    const now = Date.now();
    if (now - lastCall >= wait) {
      lastCall = now;
      callback(...args);
    }
  };
}

export function toPrimitive(
  value: unknown,
): string | number | boolean | undefined {
  if (
    typeof value === "string" ||
    typeof value === "number" ||
    typeof value === "boolean" ||
    typeof value === "undefined"
  ) {
    return value;
  }

  throw new Error(
    `Unsupported value for toPrimitive: ${JSON.stringify(value)}`,
  );
}
