interface Either {
    <A extends unknown[], R>(fn: (...args: A) => R): <X = R>(...args: A) => Promise<[Error | null, Awaited<X>]>;
}
declare const either: Either;

declare const interval: (ms?: number | undefined) => {
    loop: (fn: () => void | Promise<void>, onErr?: (e: any) => void) => Promise<void>;
    stop: () => void;
};

declare const lock: <A extends unknown[], R>(fn: (...args: A) => R) => <X = R>(...args: A) => Promise<[Error | null, Awaited<X>]>;

declare const pended: () => {
    resolve: () => void;
    reject: () => void;
    pending: Promise<void>;
};

declare type PipeChain<T> = T extends Pipeline<infer U> | Promise<infer U> ? PipeChain<U> : Pipeline<T>;
declare class Pipeline<X> extends Promise<[Error | null, X]> {
    pipe<R>(f: (x: X) => R): PipeChain<R>;
}
declare const pipeline: <X>(x?: X | undefined) => PipeChain<X>;

interface Mid<T> {
    (ctx: T, next: () => Promise<void>): Promise<void>;
}
declare const shuttle: <Ctx>(fns: Mid<Ctx>[], end?: () => Promise<void>) => <X = Promise<void>>(ctx: Ctx) => Promise<[Error | null, Awaited<X>]>;

declare const wait: (ms?: number | undefined) => Promise<unknown>;

export { either, interval, lock, pended, pipeline, shuttle, wait };
