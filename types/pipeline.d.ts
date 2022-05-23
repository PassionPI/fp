import { Jar, JarChainJoin } from "./utils/tuple";
declare type PipeChain<T> = T extends Pipeline<infer U> | Promise<infer U> ? PipeChain<JarChainJoin<U>> : Pipeline<T>;
declare type PipeChainJoin<T> = T extends Pipeline<infer U> | Promise<infer U> ? PipeChainJoin<JarChainJoin<U>> : Awaited<T>;
declare class Pipeline<X> extends Promise<Jar<X>> {
    pipe<R>(f: (x: X) => R): PipeChain<R>;
    ap(x: PipeChainJoin<X> extends (...args: any[]) => any ? Parameters<PipeChainJoin<X>>[0] : never): PipeChainJoin<X> extends (...args: any[]) => any ? PipeChain<ReturnType<PipeChainJoin<X>>> : never;
}
declare const pipeline: <X>(x?: X | undefined) => PipeChain<X>;
export { pipeline };
