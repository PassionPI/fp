import { Jar, JarChainJoin, tuples } from "./utils/tuple";

type Pipeline<T> = T extends BasePipeline<infer U> | Promise<infer U>
  ? Pipeline<JarChainJoin<U>>
  : BasePipeline<T>;

type PipeChainJoin<T> = T extends BasePipeline<infer U> | Promise<infer U>
  ? PipeChainJoin<JarChainJoin<U>>
  : Awaited<T>;

class BasePipeline<X> extends Promise<Jar<X>> {
  pipe<R>(f: (x: X) => R): Pipeline<R> {
    return super.then((t) => (t[0] ? t : f(t[1]))).then(...tuples) as any;
  }
  ap(
    x: PipeChainJoin<X> extends (...args: any[]) => any
      ? Parameters<PipeChainJoin<X>>[0]
      : never
  ): PipeChainJoin<X> extends (...args: any[]) => any
    ? Pipeline<ReturnType<PipeChainJoin<X>>>
    : never {
    return super.then((t: any) => (t[0] ? t : t[1](x))).then(...tuples) as any;
  }
}

const pipeline = <X>(x?: X): Pipeline<X> =>
  BasePipeline.resolve(x).then(...tuples) as any;

export type { Pipeline };
export { pipeline };
