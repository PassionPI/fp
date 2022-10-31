import { either } from "./either";
import { pipe } from "./sync/pipe";

const _lock = <A extends unknown[], R>(fn: (...args: A) => R) => {
  let pending: Promise<R> | null = null;
  return new Proxy(fn, {
    async apply(...args) {
      if (pending == null) {
        pending = Promise.resolve(Reflect.apply(...args));
      }
      const result = await pending;
      pending = null;
      return result;
    },
  });
};

export const lock = pipe(_lock, either);
