import { tuple } from "./utils";

interface Either {
  <A extends unknown[], R>(fn: (...args: A) => R): <E = unknown>(
    ...args: A
  ) => Promise<[E, R extends Promise<infer U> ? U : R]>;
}

//* promise结果的二元错误处理。返回 -> [错误, 结果]
export const either: Either = (fn) =>
  new Proxy(fn, {
    apply: (...args) =>
      Promise.resolve()
        .then(() => Reflect.apply(...args))
        .then(...tuple),
  }) as any;
