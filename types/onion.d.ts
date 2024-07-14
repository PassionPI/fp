export type OnionLayer<T, R> = (ctx: T, next: () => Promise<R>) => Promise<R> | R;
export declare const onion: <Ctx, Resp>(fns: Array<OnionLayer<Ctx, Resp>>, end: (ctx: Ctx) => Promise<Resp>) => (ctx: Ctx) => Promise<Resp>;
