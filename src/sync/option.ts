const O = Symbol("Option");
const OK = Symbol("Ok");
const ERR = Symbol("Err");
const NONE = Symbol("None");

type Core<T> = {
  [O]: typeof OK | typeof ERR | typeof NONE;
  val: T;
};

type Option<T> = Core<T> & {
  map<R>(f: (x: T) => R): Option<R>;
  join(): T;
};

function create<T>(x: unknown): Core<T> {
  if (x == null) {
    return { [O]: NONE, val: x as T };
  }
  if (x instanceof Error) {
    return { [O]: ERR, val: x as T };
  }
  if ((x as Core<T>)[O]) {
    return x as Core<T>;
  }
  return { [O]: OK, val: x as T };
}

function opt<T>(x: T): Option<T> {
  const o = create(x);
  return {
    ...o,
    map<R>(f: (x: T) => R): Option<R> {
      if (isOk(o)) {
        try {
          return opt(f(o.val as T));
        } catch (e) {
          return opt(e as R);
        }
      }
      return o as Option<R>;
    },
    join(): T {
      return o.val as T;
    },
  } as Option<T>;
}

function isOk(x: any) {
  return x && x[O] == OK;
}

function isErr(x: any) {
  return x && x[O] == ERR;
}

function isNone(x: any) {
  return x && x[O] == NONE;
}

export default {
  new: opt,
  isOk,
  isErr,
  isNone,
};
