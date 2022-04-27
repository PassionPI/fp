export const pended = () => {
  let resolve: () => void;
  let reject: () => void;
  const pending = new Promise<void>((...handle) => {
    [resolve, reject] = handle;
  });
  //@ts-ignore
  return { resolve, reject, pending };
};
