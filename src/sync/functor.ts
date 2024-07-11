import { create, freeze } from "../utils/object";
import { isTuple, Jar, JarJoin, tupleErr, tupleVal } from "../utils/tuple";

type Functor<T extends unknown> = {
  ap(
    x: JarJoin<T> extends (...args: any[]) => any
      ? Parameters<JarJoin<T>>[0]
      : never
  ): JarJoin<T> extends (...args: any[]) => any
    ? FunctorJarChain<ReturnType<JarJoin<T>>>
    : never;
  map<R>(f: (x: JarJoin<T>) => R): FunctorJarChain<R>;
  join(): T;
};

type FunctorJarChain<T> = T extends Functor<infer U>
  ? FunctorJarChain<U>
  : T extends Jar<infer X>
  ? FunctorJarChain<X>
  : Functor<Jar<T>>;

const SIGN = Symbol();
const TYPE = Symbol();

export const isFunctor = <T>(x: any): x is FunctorJarChain<T> =>
  x && x[SIGN] == TYPE;

export const functor = <T>(x: T): FunctorJarChain<T> => {
  if (isFunctor(x)) {
    return x as any;
  }

  if (!isTuple(x)) {
    return functor(tupleVal(x));
  }

  const [e, v] = x as any;

  if (isFunctor(v)) {
    return v as any;
  }

  const safe = (fn: any, data: any) => {
    try {
      return functor(tupleVal(fn(data)));
    } catch (err) {
      return functor(tupleErr(err));
    }
  };

  const box = create(null) as any;
  box[SIGN] = TYPE;
  box.join = () => x;
  box.map = (fn: any) => (e ? box : safe(fn, v));
  box.ap = (data: any) => (e ? box : safe(v, data));

  return freeze(box);
};

export type { FunctorJarChain as Functor };
