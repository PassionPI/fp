export const { freeze, create, keys, is } = Object;
export const isFn = (fn: unknown): fn is Function => typeof fn == "function";
export const isObj = (x: unknown): x is object =>
  typeof x == "object" && x != null;
export const identify = <T>(x: T) => x;
