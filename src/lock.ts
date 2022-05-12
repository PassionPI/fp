import { either } from "./either";

export const lock = <A extends unknown[], R>(fn: (...args: A) => R) => {
  let loading = false;
  let pending: Promise<R | void> = Promise.resolve();
  return new Proxy(either(fn), {
    async apply(...args) {
      return Promise.resolve()
        .then(() => {
          if (loading == false) {
            pending = Reflect.apply(...args);
            loading = true;
          }
          return pending;
        })
        .then((value) => {
          loading = false;
          return value;
        });
    },
  });
};
