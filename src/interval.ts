import { either } from "./either";
import { curry } from "./utils/curry";
import { wait } from "./wait";

export const interval = curry((ms: number, fn: () => void | Promise<void>) => {
  let run = true;
  const stop = () => {
    run = false;
  };
  const loop = either(async () => {
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
});
