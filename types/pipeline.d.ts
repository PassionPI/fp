import { Jar, JarJoin } from "./utils/tuple";
type Pipeline<T> = T extends BasePipeline<infer U> | Promise<infer U> ? Pipeline<JarJoin<U>> : BasePipeline<T>;
type PipelineJoin<T> = T extends BasePipeline<infer U> | Promise<infer U> ? PipelineJoin<JarJoin<U>> : Awaited<T>;
declare class BasePipeline<X> extends Promise<Jar<X>> {
    pipe<R>(f: (x: X) => R): Pipeline<R>;
    ap(x: PipelineJoin<X> extends (...args: any[]) => any ? Parameters<PipelineJoin<X>>[0] : never): PipelineJoin<X> extends (...args: any[]) => any ? Pipeline<ReturnType<PipelineJoin<X>>> : never;
}
declare const pipeline: <X>(x?: X) => Pipeline<X>;
export { pipeline };
export type { Pipeline };
