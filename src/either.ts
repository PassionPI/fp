import { JarChain, tuples } from "./utils/tuple";

interface Either {
  <A extends unknown[], R>(fn: (...args: A) => R): (
    ...args: A
  ) => Promise<JarChain<R>>;
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
