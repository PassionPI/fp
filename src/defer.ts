import { either } from "./either";

export const defer = <T = void, E = unknown>() => {
  let resolve: (data: T | PromiseLike<T>) => void, reject: (msg?: E) => void;
  const pending = new Promise<T>((res, rej) => {
    [resolve as any, reject] = [res, rej];
  });
  //@ts-ignore
  return { resolve, reject, pending: either(() => pending)() };
};
export type Defer<T = void, E = unknown> = ReturnType<typeof defer<T, E>>;
