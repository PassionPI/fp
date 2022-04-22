import { wait } from "./wait";

export const interval = (ms?: number) => {
  let run = true;
  const stop = () => {
    run = false;
  };
  const loop = async (
    fn: () => void | Promise<void>,
    onErr: (e: any) => void = () => {}
  ) => {
    run = true;
    while (run) {
      await wait(ms);
      if (run) {
        try {
          await fn();
        } catch (e) {
          onErr(e);
        }
      }
    }
  };
  return {
    loop,
    stop,
  };
};
