declare type Mid<T> = (ctx: T, next: () => Promise<void>) => Promise<void>;
export declare const shut: <Ctx>(fns: Mid<Ctx>[], end?: () => Promise<void>) => <X = Promise<void>>(ctx: Ctx) => Promise<import("./utils/tuple").Jar<X>>;
export {};
