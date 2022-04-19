import { wait } from "./wait";

export const interval = (ms?: number) => {
  let run = true;
  const stop = () => {
    run = false;
  };
  const loop = async (fn: () => void | Promise<void>) => {
    run = true;
    while (run) {
      await wait(ms);
      await fn();
    }
  };
  return {
    loop,
    stop,
  };
};
