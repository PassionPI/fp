import { isFn } from "./object";

export function createDuck<T>(init: () => T) {
  let state = init();

  const listeners = new Set<() => void>();

  return {
    listen(f: () => void) {
      listeners.add(f);
      return () => listeners.delete(f);
    },
    set(setter: T | ((val: T) => T)) {
      const old = state;
      state = isFn(setter) ? setter(state) : setter;
      if (!Object.is(old, state)) {
        listeners.forEach((fn) => fn());
      }
    },
    get() {
      return state;
    },
  };
}
