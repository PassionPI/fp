export const once = <A extends unknown[], T>(fn: (...args: A) => T) => {
  let done = false;
  let result: T;
  return (...args: A) => {
    if (!done) {
      done = true;
      result = fn(...args);
    }
    return result;
  };
};
