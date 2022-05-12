interface Mid<T> {
    (ctx: T, next: () => Promise<void>): Promise<void>;
}
export declare const shuttle: <Ctx>(fns: Mid<Ctx>[], end?: () => Promise<void>) => <X = Promise<void>>(ctx: Ctx) => Promise<[Error | null, Awaited<X>]>;
export {};
