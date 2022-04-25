import { tuple, tupleErr } from "./utils";

type JoinPipePromise<T> = T extends PipePromise<infer U> | Promise<infer U>
  ? JoinPipePromise<U>
  : PipePromise<T>;

type Pipeline<T> = JoinPipePromise<T>;

class PipePromise<X> extends Promise<[unknown, X]> {
  pipe<R>(f: (x: X) => R): Pipeline<R> {
    return super
      .then(([e, v]) => (e == null ? f(v) : tupleErr(e)))
      .then(...tuple) as any;
  }
}

const pipeline = <T>(
  f: (res: (x: T) => void, rej: (x: any) => void) => void
): Pipeline<T> => new PipePromise(f as any).then(...tuple) as any;

pipeline.resolve = <T>(x?: T): Pipeline<T> =>
  PipePromise.resolve(x).then(...tuple) as any;

pipeline.reject = <T>(x?: T): Pipeline<T> =>
  PipePromise.reject(x).then(...tuple) as any;

export { pipeline, Pipeline };
