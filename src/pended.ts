export const pended = <T = unknown, E = unknown>() => {
  let resolve: (data?: T | PromiseLike<T>) => void, reject: (msg?: E) => void;
  const pending = new Promise<T>((res, rej) => {
    [resolve as any, reject] = [res, rej];
  });
  //@ts-ignore
  return { resolve, reject, pending };
};
