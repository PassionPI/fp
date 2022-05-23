import { Jar, JarChainJoin, tuples } from "./utils/tuple";

type PipeChain<T> = T extends Pipeline<infer U> | Promise<infer U>
  ? PipeChain<JarChainJoin<U>>
  : Pipeline<T>;

type PipeChainJoin<T> = T extends Pipeline<infer U> | Promise<infer U>
  ? PipeChainJoin<JarChainJoin<U>>
  : Awaited<T>;

class Pipeline<X> extends Promise<Jar<X>> {
  pipe<R>(f: (x: X) => R): PipeChain<R> {
    return super.then((t) => (t[0] ? t : f(t[1]))).then(...tuples) as any;
  }
  ap(
    x: PipeChainJoin<X> extends (...args: any[]) => any
      ? Parameters<PipeChainJoin<X>>[0]
      : never
  ): PipeChainJoin<X> extends (...args: any[]) => any
    ? PipeChain<ReturnType<PipeChainJoin<X>>>
    : never {
    return super.then((t: any) => (t[0] ? t : t[1](x))).then(...tuples) as any;
  }
}

const pipeline = <X>(x?: X): PipeChain<X> =>
  Pipeline.resolve(x).then(...tuples) as any;

export { pipeline };
