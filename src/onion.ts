import { once } from "./utils/once";

export type OnionLayer<T, R> = (
  ctx: T,
  next: () => Promise<R>
) => Promise<R> | R;

export const onion = <Ctx, Resp>(
  fns: Array<OnionLayer<Ctx, Resp>>,
  end: (ctx: Ctx) => Promise<Awaited<Resp>>
) => {
  const len = fns?.length ?? 0;
  return (ctx: Ctx) => {
    const next = async (i: number): Promise<Awaited<Resp>> => {
      if (i < len) {
        return await fns[i](
          ctx,
          once(() => next(i + 1))
        );
      }
      return await end(ctx);
    };
    return next(0);
  };
};
