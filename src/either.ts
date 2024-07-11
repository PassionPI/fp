import { JarChain, tupleErr, tupleVal } from "./utils/tuple";

export const either = <A extends unknown[], R>(fn: (...args: A) => R) => {
  return new Proxy(fn, {
    async apply(...args) {
      try {
        return tupleVal(await Reflect.apply(...args));
      } catch (e) {
        return tupleErr(e);
      }
    },
  }) as (...args: A) => Either<R>;
};

export type EitherFn<A extends unknown[], R> = ReturnType<typeof either<A, R>>;
export type Either<R> = Promise<JarChain<R>>;
