export const TUPLE_K = Symbol();
export const TUPLE_V = Symbol();
export const tupleErr = <T>(v: T) => {
  const tuple = [v ?? new Error(), null] as const;
  tuple[TUPLE_K] = TUPLE_V;
  return tuple;
};
export const tupleVal = <T>(v: T) => {
  if (v?.[TUPLE_K] === TUPLE_V) {
    return v;
  }
  const tuple = [null, v] as const;
  tuple[TUPLE_K] = TUPLE_V;
  return tuple;
};
