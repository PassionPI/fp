import { Jar, JarChainJoin } from "./utils/tuple";
type Pipeline<T> = T extends BasePipeline<infer U> | Promise<infer U> ? Pipeline<JarChainJoin<U>> : BasePipeline<T>;
type PipeChainJoin<T> = T extends BasePipeline<infer U> | Promise<infer U> ? PipeChainJoin<JarChainJoin<U>> : Awaited<T>;
declare class BasePipeline<X> extends Promise<Jar<X>> {
    pipe<R>(f: (x: X) => R): Pipeline<R>;
    ap(x: PipeChainJoin<X> extends (...args: any[]) => any ? Parameters<PipeChainJoin<X>>[0] : never): PipeChainJoin<X> extends (...args: any[]) => any ? Pipeline<ReturnType<PipeChainJoin<X>>> : never;
}
declare const pipeline: <X>(x?: X | undefined) => Pipeline<X>;
export type { Pipeline };
export { pipeline };
