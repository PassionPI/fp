export const pended = () => {
  let resolve: () => void, reject: () => void;
  const pending = new Promise<void>((res, rej) => {
    [resolve, reject] = [res, rej];
  });
  //@ts-ignore
  return { resolve, reject, pending };
};
