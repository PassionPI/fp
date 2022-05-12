import { tuples } from "./tuple";

interface Either {
  <A extends unknown[], R>(fn: (...args: A) => R): <X = R>(
    ...args: A
  ) => Promise<[Error | null, Awaited<X>]>;
}

export const either: Either = (fn) => {
  return new Proxy(fn, {
    apply(...args) {
      return Promise.resolve()
        .then(() => Reflect.apply(...args))
        .then(...tuples) as any;
    },
  }) as any;
};
