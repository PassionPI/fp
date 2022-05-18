import { freeze } from "./object";

class Tuple<T> extends Array<T> {}

export const isTuple = (x: unknown): x is Tuple<unknown> => x instanceof Tuple;

export const tupleErr = (v?: unknown): [Error, null] =>
  (isTuple(v)
    ? v[0]
      ? v
      : tupleErr()
    : freeze(
        Tuple.of(
          v instanceof Error
            ? v
            : Error(typeof v == "object" ? JSON.stringify(v) : String(v)),
          null
        )
      )) as [Error, null];

export const tupleVal = <T>(v: T): Jar<T> =>
  (isTuple(v) ? v : freeze(Tuple.of(null, v))) as Jar<T>;

export const tuples = [tupleVal, tupleErr] as const;

export type Jar<T> = [Error | null, Awaited<T>];
export type JarChain<T> = T extends Jar<infer U> ? JarChainJoin<U> : Jar<T>;
export type JarChainJoin<T> = T extends Jar<infer U>
  ? JarChainJoin<U>
  : Awaited<T>;
