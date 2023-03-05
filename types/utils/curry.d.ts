export declare const _: unique symbol;
declare type __ = typeof _;
export interface Curry {
    (arity: 1): <T1, R>(func: (t1: T1) => R) => CurriedFunction1<T1, R>;
    (arity: 2): <T1, T2, R>(func: (t1: T1, t2: T2) => R) => CurriedFunction2<T1, T2, R>;
    (arity: 3): <T1, T2, T3, R>(func: (t1: T1, t2: T2, t3: T3) => R) => CurriedFunction3<T1, T2, T3, R>;
    (arity: 4): <T1, T2, T3, T4, R>(func: (t1: T1, t2: T2, t3: T3, t4: T4) => R) => CurriedFunction4<T1, T2, T3, T4, R>;
    (arity: 5): <T1, T2, T3, T4, T5, R>(func: (t1: T1, t2: T2, t3: T3, t4: T4, t5: T5) => R) => CurriedFunction5<T1, T2, T3, T4, T5, R>;
}
export interface CurriedFunction1<T1, R> {
    (): CurriedFunction1<T1, R>;
    (t1: T1): R;
}
export interface CurriedFunction2<T1, T2, R> {
    (): CurriedFunction2<T1, T2, R>;
    (t1: T1): CurriedFunction1<T2, R>;
    (t1: __, t2: T2): CurriedFunction1<T1, R>;
    (t1: T1, t2: T2): R;
}
export interface CurriedFunction3<T1, T2, T3, R> {
    (): CurriedFunction3<T1, T2, T3, R>;
    (t1: T1): CurriedFunction2<T2, T3, R>;
    (t1: __, t2: T2): CurriedFunction2<T1, T3, R>;
    (t1: T1, t2: T2): CurriedFunction1<T3, R>;
    (t1: __, t2: __, t3: T3): CurriedFunction2<T1, T2, R>;
    (t1: T1, t2: __, t3: T3): CurriedFunction1<T2, R>;
    (t1: __, t2: T2, t3: T3): CurriedFunction1<T1, R>;
    (t1: T1, t2: T2, t3: T3): R;
}
export interface CurriedFunction4<T1, T2, T3, T4, R> {
    (): CurriedFunction4<T1, T2, T3, T4, R>;
    (t1: T1): CurriedFunction3<T2, T3, T4, R>;
    (t1: __, t2: T2): CurriedFunction3<T1, T3, T4, R>;
    (t1: T1, t2: T2): CurriedFunction2<T3, T4, R>;
    (t1: __, t2: __, t3: T3): CurriedFunction3<T1, T2, T4, R>;
    (t1: __, t2: __, t3: T3): CurriedFunction2<T2, T4, R>;
    (t1: __, t2: T2, t3: T3): CurriedFunction2<T1, T4, R>;
    (t1: T1, t2: T2, t3: T3): CurriedFunction1<T4, R>;
    (t1: __, t2: __, t3: __, t4: T4): CurriedFunction3<T1, T2, T3, R>;
    (t1: T1, t2: __, t3: __, t4: T4): CurriedFunction2<T2, T3, R>;
    (t1: __, t2: T2, t3: __, t4: T4): CurriedFunction2<T1, T3, R>;
    (t1: __, t2: __, t3: T3, t4: T4): CurriedFunction2<T1, T2, R>;
    (t1: T1, t2: T2, t3: __, t4: T4): CurriedFunction1<T3, R>;
    (t1: T1, t2: __, t3: T3, t4: T4): CurriedFunction1<T2, R>;
    (t1: __, t2: T2, t3: T3, t4: T4): CurriedFunction1<T1, R>;
    (t1: T1, t2: T2, t3: T3, t4: T4): R;
}
export interface CurriedFunction5<T1, T2, T3, T4, T5, R> {
    (): CurriedFunction5<T1, T2, T3, T4, T5, R>;
    (t1: T1): CurriedFunction4<T2, T3, T4, T5, R>;
    (t1: __, t2: T2): CurriedFunction4<T1, T3, T4, T5, R>;
    (t1: T1, t2: T2): CurriedFunction3<T3, T4, T5, R>;
    (t1: __, t2: __, t3: T3): CurriedFunction4<T1, T2, T4, T5, R>;
    (t1: T1, t2: __, t3: T3): CurriedFunction3<T2, T4, T5, R>;
    (t1: __, t2: T2, t3: T3): CurriedFunction3<T1, T4, T5, R>;
    (t1: T1, t2: T2, t3: T3): CurriedFunction2<T4, T5, R>;
    (t1: __, t2: __, t3: __, t4: T4): CurriedFunction4<T1, T2, T3, T5, R>;
    (t1: T1, t2: __, t3: __, t4: T4): CurriedFunction3<T2, T3, T5, R>;
    (t1: __, t2: T2, t3: __, t4: T4): CurriedFunction3<T1, T3, T5, R>;
    (t1: __, t2: __, t3: T3, t4: T4): CurriedFunction3<T1, T2, T5, R>;
    (t1: T1, t2: T2, t3: __, t4: T4): CurriedFunction2<T3, T5, R>;
    (t1: T1, t2: __, t3: T3, t4: T4): CurriedFunction2<T2, T5, R>;
    (t1: __, t2: T2, t3: T3, t4: T4): CurriedFunction2<T1, T5, R>;
    (t1: T1, t2: T2, t3: T3, t4: T4): CurriedFunction1<T5, R>;
    (t1: __, t2: __, t3: __, t4: __, t5: T5): CurriedFunction4<T1, T2, T3, T4, R>;
    (t1: T1, t2: __, t3: __, t4: __, t5: T5): CurriedFunction3<T2, T3, T4, R>;
    (t1: __, t2: T2, t3: __, t4: __, t5: T5): CurriedFunction3<T1, T3, T4, R>;
    (t1: __, t2: __, t3: T3, t4: __, t5: T5): CurriedFunction3<T1, T2, T4, R>;
    (t1: __, t2: __, t3: __, t4: T4, t5: T5): CurriedFunction3<T1, T2, T3, R>;
    (t1: T1, t2: T2, t3: __, t4: __, t5: T5): CurriedFunction2<T3, T4, R>;
    (t1: T1, t2: __, t3: T3, t4: __, t5: T5): CurriedFunction2<T2, T4, R>;
    (t1: T1, t2: __, t3: __, t4: T4, t5: T5): CurriedFunction2<T2, T3, R>;
    (t1: __, t2: T2, t3: T3, t4: __, t5: T5): CurriedFunction2<T1, T4, R>;
    (t1: __, t2: T2, t3: __, t4: T4, t5: T5): CurriedFunction2<T1, T3, R>;
    (t1: __, t2: __, t3: T3, t4: T4, t5: T5): CurriedFunction2<T1, T2, R>;
    (t1: T1, t2: T2, t3: T3, t4: __, t5: T5): CurriedFunction1<T4, R>;
    (t1: T1, t2: T2, t3: __, t4: T4, t5: T5): CurriedFunction1<T3, R>;
    (t1: T1, t2: __, t3: T3, t4: T4, t5: T5): CurriedFunction1<T2, R>;
    (t1: __, t2: T2, t3: T3, t4: T4, t5: T5): CurriedFunction1<T1, R>;
    (t1: T1, t2: T2, t3: T3, t4: T4, t5: T5): R;
}
export declare const curry1: <T1, R>(func: (t1: T1) => R) => CurriedFunction1<T1, R>;
export declare const curry2: <T1, T2, R>(func: (t1: T1, t2: T2) => R) => CurriedFunction2<T1, T2, R>;
export declare const curry3: <T1, T2, T3, R>(func: (t1: T1, t2: T2, t3: T3) => R) => CurriedFunction3<T1, T2, T3, R>;
export declare const curry4: <T1, T2, T3, T4, R>(func: (t1: T1, t2: T2, t3: T3, t4: T4) => R) => CurriedFunction4<T1, T2, T3, T4, R>;
export declare const curry5: <T1, T2, T3, T4, T5, R>(func: (t1: T1, t2: T2, t3: T3, t4: T4, t5: T5) => R) => CurriedFunction5<T1, T2, T3, T4, T5, R>;
export {};
