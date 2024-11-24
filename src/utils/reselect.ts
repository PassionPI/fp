export type ReadonlySelector<T> = Readonly<((state: T) => unknown)[]>;
export type ReadonlySelectorReturn<T, S extends ReadonlySelector<T>> = {
  [Key in keyof S]: ReturnType<S[Key]>;
};
export type Calculator<T, S extends ReadonlySelector<T>, R> = (
  ...args: ReadonlySelectorReturn<T, S>
) => R;

export const reselect = <T, S extends ReadonlySelector<T>, R>(
  selectors: S,
  calc: Calculator<T, S, R>
) => {
  type Args = ReadonlySelectorReturn<T, S>;

  let args = [] as Args;
  let result: R;

  return (state: T): R => {
    const next = selectors.map((selector) => selector(state)) as Args;
    if (
      args.length != next.length ||
      next.some((arg, index) => !Object.is(arg, args[index]))
    ) {
      args = next;
      result = calc(...args);
    }
    return result;
  };
};
