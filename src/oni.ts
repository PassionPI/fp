type Unit<T, R> = (ctx: T, next: () => Promise<R>) => Promise<R>;

const once = <T>(fn: () => Promise<T>) => {
  let done = false;
  let result: T;
  return async () => {
    if (!done) {
      done = true;
      result = await fn();
    }
    return result;
  };
};

export const oni =
  <Ctx, Resp>(fns: Array<Unit<Ctx, Resp>>, end: () => Promise<Resp>) =>
  (ctx: Ctx) => {
    const next = (i: number): Promise<Resp> =>
      (fns[i] ?? end)(
        ctx,
        once(() => next(i + 1))
      );
    return next(0);
  };
