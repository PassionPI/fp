class Tuple extends Array {
}
const { freeze } = Object;
const isTuple = (x) => x instanceof Tuple;
const tupleErr = (v) => isTuple(v) ? v : freeze(Tuple.of(v || new Error(), null));
const tupleVal = (v) => isTuple(v) ? v : freeze(Tuple.of(null, v));
const tuple = [tupleVal, tupleErr];
const either = (fn) => new Proxy(fn, {
  apply: (...args) => Promise.resolve().then(() => Reflect.apply(...args)).then(...tuple)
});
const wait = (ms) => new Promise((res) => setTimeout(res, ms));
const interval = (ms) => {
  let run = true;
  const stop = () => {
    run = false;
  };
  const loop = async (fn, onErr = () => {
  }) => {
    run = true;
    while (run) {
      await wait(ms);
      if (run) {
        try {
          await fn();
        } catch (e) {
          onErr(e);
        }
      }
    }
  };
  return {
    loop,
    stop
  };
};
const pended = () => {
  let resolve;
  let reject;
  const pending = new Promise((...handle) => {
    [resolve, reject] = handle;
  });
  return { resolve, reject, pending };
};
class PipePromise extends Promise {
  pipe(f) {
    return super.then(([e, v]) => e == null ? f(v) : tupleErr(e)).then(...tuple);
  }
}
const pipeline = (f) => new PipePromise(f).then(...tuple);
pipeline.resolve = (x) => PipePromise.resolve(x).then(...tuple);
pipeline.reject = (x) => PipePromise.reject(x).then(...tuple);
export { either, interval, pended, pipeline, wait };
