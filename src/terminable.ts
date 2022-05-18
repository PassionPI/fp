import { pended } from "./pended";

export const terminable = <A extends unknown[], R>(
  fn: (...args: A) => Promise<R>
) => {
  return (...args: A) => {
    const { resolve, reject, pending } = pended<R>();

    const controller = new AbortController();
    const { abort, signal } = controller;

    const onAbort = () => {
      reject("Manual abort!");
      remove();
    };
    const remove = () => signal.removeEventListener("abort", onAbort);

    signal.addEventListener("abort", onAbort);

    Promise.resolve()
      .then(() => fn(...args))
      .then(resolve, reject)
      .then(remove);

    return {
      abort,
      pending,
    };
  };
};
