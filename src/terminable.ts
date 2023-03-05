import { either } from "./either";

export const terminable = <A extends unknown[], R>(
  fn: (...args: A) => Promise<R>
) => {
  const call = either(fn);
  return (...args: A) => {
    const { abort, signal } = new AbortController();

    const onAbort = (): void => signal.removeEventListener("abort", onAbort);

    signal.addEventListener("abort", onAbort);

    return {
      abort,
      pending: call(...args),
    };
  };
};
