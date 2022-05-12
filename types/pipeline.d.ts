declare type PipeChain<T> = T extends Pipeline<infer U> | Promise<infer U> ? PipeChain<U> : Pipeline<T>;
declare class Pipeline<X> extends Promise<[Error | null, X]> {
    pipe<R>(f: (x: X) => R): PipeChain<R>;
}
declare const pipeline: <X>(x?: X | undefined) => PipeChain<X>;
export { pipeline };
