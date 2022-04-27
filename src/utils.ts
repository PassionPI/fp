class Tuple<T> extends Array<T> {}

export const { freeze } = Object;

export const isTuple = (x: unknown) => x instanceof Tuple;

export const tupleErr = <T>(v: T) =>
  (isTuple(v) ? v : freeze(Tuple.of(v || new Error(), null))) as any;

export const tupleVal = <T>(v: T) =>
  (isTuple(v) ? v : freeze(Tuple.of(null, v))) as any;

export const tuple = [tupleVal, tupleErr] as any;
