import { Jar, JarJoin } from "../utils/tuple";
type Functor<T extends unknown> = {
    ap(x: JarJoin<T> extends (...args: any[]) => any ? Parameters<JarJoin<T>>[0] : never): JarJoin<T> extends (...args: any[]) => any ? FunctorJarChain<ReturnType<JarJoin<T>>> : never;
    map<R>(f: (x: JarJoin<T>) => R): FunctorJarChain<R>;
    join(): T;
};
type FunctorJarChain<T> = T extends Functor<infer U> ? FunctorJarChain<U> : T extends Jar<infer X> ? FunctorJarChain<X> : Functor<Jar<T>>;
export declare const isFunctor: <T>(x: any) => x is FunctorJarChain<T>;
export declare const functor: <T>(x: T) => FunctorJarChain<T>;
export type { FunctorJarChain as Functor };
