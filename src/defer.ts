import { either } from "./either";

export const defer = <T = void, E = unknown>() => {
  let resolve: (data: T | PromiseLike<T>) => void, reject: (msg?: E) => void;
  const src = new Promise<T>((res, rej) => {
    [resolve as any, reject] = [res, rej];
  });
  const wrap = either(() => src);
  const unwrap = () => src;
  type Wrap = typeof wrap & { unwrap: typeof unwrap };
  (wrap as Wrap).unwrap = unwrap;
  //@ts-ignore
  return { resolve, reject, pending: wrap as Wrap };
};
export type Defer<T = void, E = unknown> = ReturnType<typeof defer<T, E>>;
