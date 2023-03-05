export const once = <T>(fn: () => T) => {
  let done = false;
  let result: T;
  return () => {
    if (!done) {
      done = true;
      result = fn();
    }
    return result;
  };
};
