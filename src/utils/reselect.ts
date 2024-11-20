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
  const last: { args: Args; result: R } = {
    args: [] as Args,
    result: null as R,
  };

  return (state: T): R => {
    const args = selectors.map((selector) => selector(state)) as Args;
    if (args.some((arg, index) => !Object.is(arg, last.args[index]))) {
      last.args = args;
      last.result = calc(...args);
    }
    return last.result;
  };
};
