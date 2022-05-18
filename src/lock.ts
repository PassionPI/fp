import { either } from "./either";
import { compose } from "./utils/compose";

const _lock = <A extends unknown[], R>(fn: (...args: A) => R) => {
  let pending: Promise<R> | null = null;
  return new Proxy(fn, {
    async apply(...args) {
      if (pending == null) {
        pending = Reflect.apply(...args);
      }
      const result = await pending;
      pending = null;
      return result;
    },
  });
};

export const lock = compose(_lock, either);
