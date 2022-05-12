class Tuple extends Array {
}
const { freeze } = Object;
const isTuple = (x) => x instanceof Tuple;
const tupleErr = (v) => isTuple(v) ? v[0] ? v : tupleErr() : freeze(Tuple.of(v instanceof Error ? v : Error(typeof v == "object" ? JSON.stringify(v) : String(v)), null));
const tupleVal = (v) => isTuple(v) ? v : freeze(Tuple.of(null, v));
const tuples = [tupleVal, tupleErr];
const either = (fn) => {
  return new Proxy(fn, {
    apply(...args) {
      return Promise.resolve().then(() => Reflect.apply(...args)).then(...tuples);
    }
  });
};
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
const lock = (fn) => {
  let loading = false;
  let pending = Promise.resolve();
  return new Proxy(either(fn), {
    async apply(...args) {
      return Promise.resolve().then(() => {
        if (loading == false) {
          pending = Reflect.apply(...args);
          loading = true;
        }
        return pending;
      }).then((value) => {
        loading = false;
        return value;
      });
    }
  });
};
const pended = () => {
  let resolve, reject;
  const pending = new Promise((res, rej) => {
    [resolve, reject] = [res, rej];
  });
  return { resolve, reject, pending };
};
class Pipeline extends Promise {
  pipe(f) {
    return super.then((t) => t[0] ? t : f(t[1])).then(...tuples);
  }
}
const pipeline = (x) => Pipeline.resolve(x).then(...tuples);
const _resolve = () => Promise.resolve();
const shuttle = (fns, end = _resolve) => either((ctx) => {
  const dispatch = async (i) => {
    var _a;
    let done = false;
    const fn = (_a = fns[i]) != null ? _a : end;
    const pm = await fn(ctx, () => {
      if (done)
        return _resolve();
      done = true;
      return dispatch(i + 1);
    });
    return pm;
  };
  return dispatch(0);
});
export { either, interval, lock, pended, pipeline, shuttle, wait };
