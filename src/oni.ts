import { once } from "./utils/once";

type Unit<T, R> = (ctx: T, next: () => Promise<R>) => R | Promise<R>;

export const oni =
  <Ctx, Resp>(fns: Array<Unit<Ctx, Resp>>, end: (ctx: Ctx) => Promise<Resp>) =>
  (ctx: Ctx) => {
    const next = (i: number): Promise<Resp> =>
      Promise.resolve(
        (fns[i] ?? end)(
          ctx,
          once(() => next(i + 1))
        )
      );
    return next(0);
  };
