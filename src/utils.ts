class Tuple extends Array {}

const isTuple = (x: any) => x instanceof Tuple;

export const tupleErr = <T>(v: T) =>
  isTuple(v) ? v : Tuple.of(v || new Error(), null);

export const tupleVal = <T>(v: T) => (isTuple(v) ? v : Tuple.of(null, v));

export const tuple = [tupleVal, tupleErr];
