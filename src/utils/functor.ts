import { create, freeze } from "./object";
import { isTuple, JarChain, JarChainJoin, tupleErr, tupleVal } from "./tuple";

type Functor<T extends unknown> = {
  ap(
    x: JarChainJoin<T> extends (...args: any[]) => any
      ? Parameters<JarChainJoin<T>>[0]
      : never
  ): JarChainJoin<T> extends (...args: any[]) => any
    ? FunctorChain<JarChain<ReturnType<JarChainJoin<T>>>>
    : never;
  map<R>(f: (x: JarChainJoin<T>) => R): FunctorChain<JarChain<R>>;
  join(): T;
};

type FunctorChain<T> = T extends Functor<infer U>
  ? FunctorChain<U>
  : Functor<T>;

const SIGN = Symbol();
const TYPE = Symbol();

export const isFunctor = <T>(x: any): x is FunctorChain<T> =>
  x && x[SIGN] == TYPE;

export function functor<T>(x: T): FunctorChain<JarChain<T>> {
  if (isFunctor(x)) return x as any;
  if (!isTuple(x)) return functor(tupleVal(x)) as any;

  const [e, value] = x as any;

  if (isFunctor(value)) return value as any;

  const safe = (fn: any, data: any) => {
    try {
      return functor(tupleVal(fn(data)));
    } catch (e) {
      return functor(tupleErr(e));
    }
  };

  const box = create(null) as any;
  box[SIGN] = TYPE;
  box.join = () => x;
  box.map = (fn: any) => (e ? box : safe(fn, value));
  box.ap = (data: any) => (e ? box : safe(value, data));

  return freeze(box);
}
