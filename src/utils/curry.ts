type ToCurrying<Args extends unknown[], Return> = Args extends [
  ...infer Head,
  infer Tail
]
  ? ToCurrying<Head, (arg: Tail) => Return>
  : Return;

export type Currying<Args extends unknown[], Return> = Args extends []
  ? () => Return
  : ToCurrying<Args, Return>;

export const curry = <Args extends unknown[], Return>(
  fn: (...args: Args) => Return,
  len?: number
): Currying<Args, Return> => {
  const x = fn.length || len || 0;
  const c = (...args: Args) =>
    args.length >= x ? fn(...args) : (...more: []) => c(...args, ...more);
  return c as Currying<Args, Return>;
};
