import { JarChain, tupleErr, tupleVal } from "./utils/tuple";

type _Either = <A extends unknown[], R>(
  fn: (...args: A) => R
) => (...args: A) => Promise<JarChain<R>>;

export const either: _Either = (fn) => {
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

export type EitherFn<A extends unknown[], R> = ReturnType<typeof either<A, R>>;
export type Either<R> = Promise<JarChain<R>>;
