export { deterministicId } from "./deterministicId";
export type { AtLeast, Optional, EmptyObject } from "./types";

export function assertNever(value: never, message?: string): never {
  console.error("Unknown value", value);
  message ??= "Not possible value";
  throw Error(message);
}
