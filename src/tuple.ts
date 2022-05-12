class Tuple<T> extends Array<T> {}

export const { freeze } = Object;

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

export const tupleVal = <T>(v: T): [null, T] =>
  (isTuple(v) ? v : freeze(Tuple.of(null, v))) as [null, T];

export const tuples = [tupleVal, tupleErr] as const;
