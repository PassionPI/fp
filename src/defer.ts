import { either } from "./either";

export const defer = <T = void, E = unknown>() => {
  let resolve: (data: T | PromiseLike<T>) => void = () => {};
  let reject: (msg?: E) => void = () => {};
  const x = new Promise<T>((res, rej) => {
    [resolve, reject] = [res, rej];
  });
  const wrap = either(() => x);
  const unwrap = () => x;
  type Wrap = typeof wrap & { unwrap: typeof unwrap };
  (wrap as Wrap).unwrap = unwrap;

  return { resolve, reject, pending: wrap as Wrap };
};
export type Defer<T = void, E = unknown> = ReturnType<typeof defer<T, E>>;
