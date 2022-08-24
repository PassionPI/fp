import { JarChain, tuples } from "./utils/tuple";

export type Either = <A extends unknown[], R>(
  fn: (...args: A) => R
) => (...args: A) => Promise<JarChain<R>>;

export const either: Either = (fn) => {
  return new Proxy(fn, {
    apply(...args) {
      return Promise.resolve()
        .then(() => Reflect.apply(...args))
        .then(...tuples) as any;
    },
  }) as any;
};
