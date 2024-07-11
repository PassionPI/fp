export type Unit<T, R> = (ctx: T, next: () => Promise<R>) => Promise<R> | R;
export declare const oni: <Ctx, Resp>(fns: Array<Unit<Ctx, Resp>>, end: (ctx: Ctx) => Promise<Resp>) => (ctx: Ctx) => Promise<Resp>;
