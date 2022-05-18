import { JarChain, JarChainJoin } from "./tuple";
declare type Functor<T extends unknown> = {
    ap(x: JarChainJoin<T> extends (...args: any[]) => any ? Parameters<JarChainJoin<T>>[0] : never): JarChainJoin<T> extends (...args: any[]) => any ? FunctorChain<JarChain<ReturnType<JarChainJoin<T>>>> : never;
    map<R>(f: (x: JarChainJoin<T>) => R): FunctorChain<JarChain<R>>;
    join(): T;
};
declare type FunctorChain<T> = T extends Functor<infer U> ? FunctorChain<U> : Functor<T>;
export declare const isFunctor: <T>(x: any) => x is FunctorChain<T>;
export declare function functor<T>(x: T): FunctorChain<JarChain<T>>;
export {};
