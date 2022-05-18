const { freeze, create } = Object;
class Tuple extends Array {
}
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
  const loop = either(async (fn) => {
    run = true;
    await wait(ms);
    while (run) {
      await fn();
      await wait(ms);
    }
  });
  return {
    loop,
    stop
  };
};
const compose = (...fns) => (acc) => {
  for (const fn of fns) {
    acc = fn(acc);
  }
  return acc;
};
const asyncCompose = (...fns) => async (acc) => {
  for (const fn of fns) {
    acc = fn(await acc);
  }
  return acc;
};
const _lock = (fn) => {
  let pending = null;
  return new Proxy(fn, {
    async apply(...args) {
      if (pending == null) {
        pending = Reflect.apply(...args);
      }
      const result = await pending;
      pending = null;
      return result;
    }
  });
};
const lock = compose(_lock, either);
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
const SIGN = Symbol();
const TYPE = Symbol();
const isFunctor = (x) => x && x[SIGN] == TYPE;
function functor(x) {
  if (isFunctor(x)) {
    return x;
  }
  const callee = functor;
  if (!isTuple(x)) {
    return callee(tupleVal(x));
  }
  const safe = (fn, data) => {
    try {
      return callee(tupleVal(fn(data)));
    } catch (e) {
      return callee(tupleErr(e));
    }
  };
  const box = create(null);
  box[SIGN] = TYPE;
  box.join = () => x;
  box.map = (fn) => {
    const [e, data] = x;
    if (e) {
      return box;
    }
    return safe(fn, data);
  };
  box.ap = (data) => {
    const [e, fn] = x;
    if (e) {
      return box;
    }
    return safe(fn, data);
  };
  return freeze(box);
}
export { asyncCompose, compose, either, functor, interval, isFunctor, lock, pended, pipeline, wait };
