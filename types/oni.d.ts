type Unit<T, R> = (ctx: T, next: () => Promise<R>) => R | Promise<R>;
export declare const oni: <Ctx, Resp>(fns: Unit<Ctx, Resp>[], end: (ctx: Ctx) => Promise<Resp>) => (ctx: Ctx) => Promise<Resp>;
export {};
