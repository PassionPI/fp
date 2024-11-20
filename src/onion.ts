import { once } from "./utils/once";

export type OnionLayer<T, R> = (
  ctx: T,
  next: () => Promise<R>
) => Promise<R> | R;

export const onion = <Ctx, Resp>(...fns: Array<OnionLayer<Ctx, Resp>>) => {
  const len = fns?.length ?? 0;
  return (ctx: Ctx) => {
    const next = async (i: number): Promise<Awaited<Resp>> => {
      if (i >= len || typeof fns[i] != "function") {
        return Promise.resolve() as Promise<Awaited<Resp>>;
      }
      return await fns[i](
        ctx,
        once(() => next(i + 1))
      );
    };
    return next(0);
  };
};
