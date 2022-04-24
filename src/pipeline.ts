import { tupleErr, tupleVal } from "./utils";

type JoinPipePromise<T> = T extends PipePromise<infer U> | Promise<infer U>
  ? JoinPipePromise<U>
  : PipePromise<T>;

type Pipeline<T> = JoinPipePromise<T>;

class PipePromise<X> extends Promise<[unknown, X]> {
  pipe<R>(f: (x: X) => R): Pipeline<R> {
    return super.then(([e, v]) => {
      if (e == null) {
        return pipeline((res) => res(f(v)));
      }
      return tupleErr(e);
    }, tupleErr) as any;
  }
}

const pipeline = <T>(
  f: (res: (x: T) => void, rej: (x: any) => void) => void
): Pipeline<T> => new PipePromise(f as any).then(tupleVal, tupleErr) as any;

pipeline.resolve = <T>(x?: T): Pipeline<T> =>
  PipePromise.resolve(x).then(tupleVal, tupleErr) as any;

pipeline.reject = <T>(x?: T): Pipeline<T> =>
  PipePromise.reject(x).then(tupleVal, tupleErr) as any;

export { pipeline, Pipeline };
