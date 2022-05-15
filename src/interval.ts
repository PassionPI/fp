import { either } from "./either";
import { wait } from "./wait";

export const interval = (ms?: number) => {
  let run = true;
  const stop = () => {
    run = false;
  };
  const loop = either(async (fn: () => void | Promise<void>) => {
    run = true;
    await wait(ms);
    while (run) {
      await fn();
      await wait(ms);
    }
  });
  return {
    loop,
    stop,
  };
};
