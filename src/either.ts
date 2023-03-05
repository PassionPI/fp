import { JarChain, tupleErr, tupleVal } from "./utils/tuple";

export type Either = <A extends unknown[], R>(
  fn: (...args: A) => R
) => (...args: A) => Promise<JarChain<R>>;

export const either: Either = (fn) => {
  return new Proxy(fn, {
    async apply(...args) {
      try {
        return tupleVal(await Reflect.apply(...args));
      } catch (e) {
        return tupleErr(e);
      }
    },
  }) as any;
};
