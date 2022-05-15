import { Jar, tuples } from "./tuple";

type PipeChain<T> = T extends Pipeline<infer U> | Promise<infer U>
  ? PipeChain<U>
  : Pipeline<T>;

class Pipeline<X> extends Promise<Jar<X>> {
  pipe<R>(f: (x: X) => R): PipeChain<R> {
    return super.then((t) => (t[0] ? t : f(t[1]))).then(...tuples) as any;
  }
}

const pipeline = <X>(x?: X): PipeChain<X> =>
  Pipeline.resolve(x).then(...tuples) as any;

export { pipeline };
