type ToCurrying<Args extends unknown[], Return> = Args extends [
  ...infer Head,
  infer Tail
]
  ? ToCurrying<Head, (arg: Tail) => Return>
  : Return;

export type Currying<T extends Function> = T extends (
  ...args: infer Args
) => infer Return
  ? Args extends []
    ? () => Return
    : ToCurrying<Args, Return>
  : never;

export const curry = <T extends Function>(fn: T, len?: number): Currying<T> => {
  const x = fn.length || len || 0;
  const c = (...args: unknown[]) =>
    args.length >= x
      ? fn(...args)
      : (...more: unknown[]) => c(...args, ...more);
  return c as Currying<T>;
};
