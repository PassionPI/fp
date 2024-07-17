export const defer = <T = void, E = unknown>() => {
  let resolve: (data: T | PromiseLike<T>) => void;
  let reject: (msg?: E) => void;
  const pending = new Promise<T>((res, rej) => {
    resolve = res;
    reject = rej;
  });
  //@ts-expect-error
  return { resolve, reject, pending };
};
export type Defer<T = void, E = unknown> = ReturnType<typeof defer<T, E>>;
