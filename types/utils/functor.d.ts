import { Jar, JarChainJoin } from "./tuple";
declare type Functor<T extends unknown> = {
    ap(x: JarChainJoin<T> extends (...args: any[]) => any ? Parameters<JarChainJoin<T>>[0] : never): JarChainJoin<T> extends (...args: any[]) => any ? FunctorJarChain<ReturnType<JarChainJoin<T>>> : never;
    map<R>(f: (x: JarChainJoin<T>) => R): FunctorJarChain<R>;
    join(): T;
};
declare type FunctorJarChain<T> = T extends Functor<infer U> ? FunctorJarChain<U> : T extends Jar<infer X> ? FunctorJarChain<X> : Functor<Jar<T>>;
export declare const isFunctor: <T>(x: any) => x is FunctorJarChain<T>;
export declare const functor: <T>(x: T) => FunctorJarChain<T>;
export {};
