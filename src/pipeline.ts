import { Jar, JarJoin, tuples } from "./utils/tuple";

type Pipeline<T> = T extends BasePipeline<infer U> | Promise<infer U>
  ? Pipeline<JarJoin<U>>
  : BasePipeline<T>;

type PipelineJoin<T> = T extends BasePipeline<infer U> | Promise<infer U>
  ? PipelineJoin<JarJoin<U>>
  : Awaited<T>;

class BasePipeline<X> extends Promise<Jar<X>> {
  pipe<R>(f: (x: X) => R): Pipeline<R> {
    return super.then((t) => (t[0] ? t : f(t[1]))).then(...tuples) as any;
  }
  ap(
    x: PipelineJoin<X> extends (...args: any[]) => any
      ? Parameters<PipelineJoin<X>>[0]
      : never
  ): PipelineJoin<X> extends (...args: any[]) => any
    ? Pipeline<ReturnType<PipelineJoin<X>>>
    : never {
    return super.then((t: any) => (t[0] ? t : t[1](x))).then(...tuples) as any;
  }
}

const pipeline = <X>(x?: X): Pipeline<X> =>
  BasePipeline.resolve(x).then(...tuples) as any;

export { pipeline };
export type { Pipeline };

