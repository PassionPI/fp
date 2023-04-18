/**
 *
 * @description 并发控制函数
 *
 * 1、是否有空闲
 * 2、数量池
 * 3、排队等待
 */
type Task<T> = () => Promise<T>;
declare class Concurrent {
    #private;
    static of(...args: ConstructorParameters<typeof Concurrent>): Concurrent;
    constructor(config?: {
        max_concurrency?: number;
    });
    add: <T>(task: Task<T>) => Promise<T>;
    busy: () => boolean;
    clear: () => void;
}

type Jar<T> = [Error | null, Awaited<T>];
type JarChain<T> = Jar<JarChainJoin<T>>;
type JarChainJoin<T> = T extends Jar<infer U> ? JarChainJoin<U> : Awaited<T>;

declare const defer: <T = void, E = unknown>() => {
    resolve: (data: T | PromiseLike<T>) => void;
    reject: (msg?: E | undefined) => void;
    pending: (() => Promise<JarChain<Promise<T>>>) & {
        unwrap: () => Promise<T>;
    };
};
type Defer<T = void, E = unknown> = ReturnType<typeof defer<T, E>>;

type _Either = <A extends unknown[], R>(fn: (...args: A) => R) => (...args: A) => Promise<JarChain<R>>;
declare const either: _Either;
type EitherFn<A extends unknown[], R> = ReturnType<typeof either<A, R>>;
type Either<R> = Promise<JarChain<R>>;

declare const lock: <A extends unknown[], R>(init: (...args: A) => R) => (...args: A) => Promise<JarChain<R>>;

type Unit<T, R> = (ctx: T, next: () => Promise<R>) => Promise<R> | R;
declare const oni: <Ctx, Resp>(fns: Unit<Ctx, Resp>[], end: (ctx: Ctx) => Promise<Resp>) => (ctx: Ctx) => Promise<Resp>;

type Pipeline<T> = T extends BasePipeline<infer U> | Promise<infer U> ? Pipeline<JarChainJoin<U>> : BasePipeline<T>;
type PipeChainJoin<T> = T extends BasePipeline<infer U> | Promise<infer U> ? PipeChainJoin<JarChainJoin<U>> : Awaited<T>;
declare class BasePipeline<X> extends Promise<Jar<X>> {
    pipe<R>(f: (x: X) => R): Pipeline<R>;
    ap(x: PipeChainJoin<X> extends (...args: any[]) => any ? Parameters<PipeChainJoin<X>>[0] : never): PipeChainJoin<X> extends (...args: any[]) => any ? Pipeline<ReturnType<PipeChainJoin<X>>> : never;
}
declare const pipeline: <X>(x?: X | undefined) => Pipeline<X>;

declare const LRU: <K, V>(size: number) => {
    get(key: K): V | undefined;
    set(key: K, value: V): void;
};

interface Pipe {
    <R, T1 = void>(fn1: (t1: T1) => R): (init: T1) => R;
    <R, T1 = void, T2 = void>(fn1: (t1: T1) => T2, fn2: (t2: T2) => R): (init: T1) => R;
    <R, T1 = void, T2 = void, T3 = void>(fn1: (t1: T1) => T2, fn2: (t2: T2) => T3, fn3: (t3: T3) => R): (init: T1) => R;
    <R, T1 = void, T2 = void, T3 = void, T4 = void>(fn1: (t1: T1) => T2, fn2: (t2: T2) => T3, fn3: (t3: T3) => T4, fn4: (t4: T4) => R): (init: T1) => R;
    <R, T1 = void, T2 = void, T3 = void, T4 = void, T5 = void>(fn1: (t1: T1) => T2, fn2: (t2: T2) => T3, fn3: (t3: T3) => T4, fn4: (t4: T4) => T5, fn5: (t5: T5) => R): (init: T1) => R;
    <R, T1 = void, T2 = void, T3 = void, T4 = void, T5 = void, T6 = void>(fn1: (t1: T1) => T2, fn2: (t2: T2) => T3, fn3: (t3: T3) => T4, fn4: (t4: T4) => T5, fn5: (t5: T5) => T6, fn6: (t6: T6) => R): (init: T1) => R;
    <R, T1 = void, T2 = void, T3 = void, T4 = void, T5 = void, T6 = void, T7 = void>(fn1: (t1: T1) => T2, fn2: (t2: T2) => T3, fn3: (t3: T3) => T4, fn4: (t4: T4) => T5, fn5: (t5: T5) => T6, fn6: (t6: T6) => T7, fn7: (t7: T7) => R): (init: T1) => R;
    <R, T1 = void, T2 = void, T3 = void, T4 = void, T5 = void, T6 = void, T7 = void, T8 = void>(fn1: (t1: T1) => T2, fn2: (t2: T2) => T3, fn3: (t3: T3) => T4, fn4: (t4: T4) => T5, fn5: (t5: T5) => T6, fn6: (t6: T6) => T7, fn7: (t7: T7) => T8, fn8: (t7: T8) => R): (init: T1) => R;
    <R, T1 = void, T2 = void, T3 = void, T4 = void, T5 = void, T6 = void, T7 = void, T8 = void, T9 = void>(fn1: (t1: T1) => T2, fn2: (t2: T2) => T3, fn3: (t3: T3) => T4, fn4: (t4: T4) => T5, fn5: (t5: T5) => T6, fn6: (t6: T6) => T7, fn7: (t7: T7) => T8, fn8: (t7: T8) => T9, fn9: (t7: T9) => R): (init: T1) => R;
    <R, T1 = void, T2 = void, T3 = void, T4 = void, T5 = void, T6 = void, T7 = void, T8 = void, T9 = void, T10 = void>(fn1: (t1: T1) => T2, fn2: (t2: T2) => T3, fn3: (t3: T3) => T4, fn4: (t4: T4) => T5, fn5: (t5: T5) => T6, fn6: (t6: T6) => T7, fn7: (t7: T7) => T8, fn8: (t8: T8) => T9, fn9: (t9: T9) => T10, fn10: (t10: T10) => R): (init: T1) => R;
    <R, T1 = void, T2 = void, T3 = void, T4 = void, T5 = void, T6 = void, T7 = void, T8 = void, T9 = void, T10 = void, T11 = void>(fn1: (t1: T1) => T2, fn2: (t2: T2) => T3, fn3: (t3: T3) => T4, fn4: (t4: T4) => T5, fn5: (t5: T5) => T6, fn6: (t6: T6) => T7, fn7: (t7: T7) => T8, fn8: (t8: T8) => T9, fn9: (t9: T9) => T10, fn10: (t10: T10) => T11, fn11: (t11: T11) => R): (init: T1) => R;
    <R, T1 = void, T2 = void, T3 = void, T4 = void, T5 = void, T6 = void, T7 = void, T8 = void, T9 = void, T10 = void, T11 = void, T12 = void>(fn1: (t1: T1) => T2, fn2: (t2: T2) => T3, fn3: (t3: T3) => T4, fn4: (t4: T4) => T5, fn5: (t5: T5) => T6, fn6: (t6: T6) => T7, fn7: (t7: T7) => T8, fn8: (t8: T8) => T9, fn9: (t9: T9) => T10, fn10: (t10: T10) => T11, fn11: (t11: T11) => T12, fn12: (t12: T12) => R): (init: T1) => R;
    <R, T1 = void, T2 = void, T3 = void, T4 = void, T5 = void, T6 = void, T7 = void, T8 = void, T9 = void, T10 = void, T11 = void, T12 = void, T13 = void>(fn1: (t1: T1) => T2, fn2: (t2: T2) => T3, fn3: (t3: T3) => T4, fn4: (t4: T4) => T5, fn5: (t5: T5) => T6, fn6: (t6: T6) => T7, fn7: (t7: T7) => T8, fn8: (t8: T8) => T9, fn9: (t9: T9) => T10, fn10: (t10: T10) => T11, fn11: (t11: T11) => T12, fn12: (t12: T12) => T13, fn13: (t13: T13) => R): (init: T1) => R;
    <R, T1 = void, T2 = void, T3 = void, T4 = void, T5 = void, T6 = void, T7 = void, T8 = void, T9 = void, T10 = void, T11 = void, T12 = void, T13 = void, T14 = void>(fn1: (t1: T1) => T2, fn2: (t2: T2) => T3, fn3: (t3: T3) => T4, fn4: (t4: T4) => T5, fn5: (t5: T5) => T6, fn6: (t6: T6) => T7, fn7: (t7: T7) => T8, fn8: (t8: T8) => T9, fn9: (t9: T9) => T10, fn10: (t10: T10) => T11, fn11: (t11: T11) => T12, fn12: (t12: T12) => T13, fn13: (t13: T13) => T14, fn14: (t14: T14) => R): (init: T1) => R;
    <R, T1 = void, T2 = void, T3 = void, T4 = void, T5 = void, T6 = void, T7 = void, T8 = void, T9 = void, T10 = void, T11 = void, T12 = void, T13 = void, T14 = void, T15 = void>(fn1: (t1: T1) => T2, fn2: (t2: T2) => T3, fn3: (t3: T3) => T4, fn4: (t4: T4) => T5, fn5: (t5: T5) => T6, fn6: (t6: T6) => T7, fn7: (t7: T7) => T8, fn8: (t8: T8) => T9, fn9: (t9: T9) => T10, fn10: (t10: T10) => T11, fn11: (t11: T11) => T12, fn12: (t12: T12) => T13, fn13: (t13: T13) => T14, fn14: (t14: T14) => T15, fn15: (t15: T15) => R): (init: T1) => R;
    <R, T1 = void, T2 = void, T3 = void, T4 = void, T5 = void, T6 = void, T7 = void, T8 = void, T9 = void, T10 = void, T11 = void, T12 = void, T13 = void, T14 = void, T15 = void, T16 = void>(fn1: (t1: T1) => T2, fn2: (t2: T2) => T3, fn3: (t3: T3) => T4, fn4: (t4: T4) => T5, fn5: (t5: T5) => T6, fn6: (t6: T6) => T7, fn7: (t7: T7) => T8, fn8: (t8: T8) => T9, fn9: (t9: T9) => T10, fn10: (t10: T10) => T11, fn11: (t11: T11) => T12, fn12: (t12: T12) => T13, fn13: (t13: T13) => T14, fn14: (t14: T14) => T15, fn15: (t15: T15) => T16, fn16: (t16: T16) => R): (init: T1) => R;
}
type Out<T> = Awaited<T>;
type Init<T> = Out<T> | Result<T>;
type Chain<T> = T;
type Result<T> = Promise<Out<T>>;
type ResultFn<T, R> = (init: Init<T>) => Result<R>;
interface AsyncPipe {
    <R, T1 = void>(fn1: (t1: Out<T1>) => Chain<R>): ResultFn<T1, R>;
    <R, T1 = void, T2 = void>(fn1: (t1: Out<T1>) => Chain<T2>, fn2: (t2: Out<T2>) => Chain<R>): ResultFn<T1, R>;
    <R, T1 = void, T2 = void, T3 = void>(fn1: (t1: Out<T1>) => Chain<T2>, fn2: (t2: Out<T2>) => Chain<T3>, fn3: (t3: Out<T3>) => Chain<R>): ResultFn<T1, R>;
    <R, T1 = void, T2 = void, T3 = void, T4 = void>(fn1: (t1: Out<T1>) => Chain<T2>, fn2: (t2: Out<T2>) => Chain<T3>, fn3: (t3: Out<T3>) => Chain<T4>, fn4: (t4: Out<T4>) => Chain<R>): ResultFn<T1, R>;
    <R, T1 = void, T2 = void, T3 = void, T4 = void, T5 = void>(fn1: (t1: Out<T1>) => Chain<T2>, fn2: (t2: Out<T2>) => Chain<T3>, fn3: (t3: Out<T3>) => Chain<T4>, fn4: (t4: Out<T4>) => Chain<T5>, fn5: (t5: Out<T5>) => Chain<R>): ResultFn<T1, R>;
    <R, T1 = void, T2 = void, T3 = void, T4 = void, T5 = void, T6 = void>(fn1: (t1: Out<T1>) => Chain<T2>, fn2: (t2: Out<T2>) => Chain<T3>, fn3: (t3: Out<T3>) => Chain<T4>, fn4: (t4: Out<T4>) => Chain<T5>, fn5: (t5: Out<T5>) => Chain<T6>, fn6: (t5: Out<T6>) => Chain<R>): ResultFn<T1, R>;
    <R, T1 = void, T2 = void, T3 = void, T4 = void, T5 = void, T6 = void, T7 = void>(fn1: (t1: Out<T1>) => Chain<T2>, fn2: (t2: Out<T2>) => Chain<T3>, fn3: (t3: Out<T3>) => Chain<T4>, fn4: (t4: Out<T4>) => Chain<T5>, fn5: (t5: Out<T5>) => Chain<T6>, fn6: (t5: Out<T6>) => Chain<T7>, fn7: (t5: Out<T7>) => Chain<R>): ResultFn<T1, R>;
    <R, T1 = void, T2 = void, T3 = void, T4 = void, T5 = void, T6 = void, T7 = void, T8 = void>(fn1: (t1: Out<T1>) => Chain<T2>, fn2: (t2: Out<T2>) => Chain<T3>, fn3: (t3: Out<T3>) => Chain<T4>, fn4: (t4: Out<T4>) => Chain<T5>, fn5: (t5: Out<T5>) => Chain<T6>, fn6: (t5: Out<T6>) => Chain<T7>, fn7: (t5: Out<T7>) => Chain<T8>, fn8: (t5: Out<T8>) => Chain<R>): ResultFn<T1, R>;
    <R, T1 = void, T2 = void, T3 = void, T4 = void, T5 = void, T6 = void, T7 = void, T8 = void, T9 = void>(fn1: (t1: Out<T1>) => Chain<T2>, fn2: (t2: Out<T2>) => Chain<T3>, fn3: (t3: Out<T3>) => Chain<T4>, fn4: (t4: Out<T4>) => Chain<T5>, fn5: (t5: Out<T5>) => Chain<T6>, fn6: (t5: Out<T6>) => Chain<T7>, fn7: (t5: Out<T7>) => Chain<T8>, fn8: (t5: Out<T8>) => Chain<T9>, fn9: (t5: Out<T9>) => Chain<R>): ResultFn<T1, R>;
    <R, T1 = void, T2 = void, T3 = void, T4 = void, T5 = void, T6 = void, T7 = void, T8 = void, T9 = void, T10 = void>(fn1: (t1: Out<T1>) => Chain<T2>, fn2: (t2: Out<T2>) => Chain<T3>, fn3: (t3: Out<T3>) => Chain<T4>, fn4: (t4: Out<T4>) => Chain<T5>, fn5: (t5: Out<T5>) => Chain<T6>, fn6: (t6: Out<T6>) => Chain<T7>, fn7: (t7: Out<T7>) => Chain<T8>, fn8: (t8: Out<T8>) => Chain<T9>, fn9: (t9: Out<T9>) => Chain<T10>, fn10: (t10: Out<T10>) => Chain<R>): ResultFn<T1, R>;
    <R, T1 = void, T2 = void, T3 = void, T4 = void, T5 = void, T6 = void, T7 = void, T8 = void, T9 = void, T10 = void, T11 = void>(fn1: (t1: Out<T1>) => Chain<T2>, fn2: (t2: Out<T2>) => Chain<T3>, fn3: (t3: Out<T3>) => Chain<T4>, fn4: (t4: Out<T4>) => Chain<T5>, fn5: (t5: Out<T5>) => Chain<T6>, fn6: (t6: Out<T6>) => Chain<T7>, fn7: (t7: Out<T7>) => Chain<T8>, fn8: (t8: Out<T8>) => Chain<T9>, fn9: (t9: Out<T9>) => Chain<T10>, fn10: (t10: Out<T10>) => Chain<T11>, fn11: (t11: Out<T11>) => Chain<R>): ResultFn<T1, R>;
    <R, T1 = void, T2 = void, T3 = void, T4 = void, T5 = void, T6 = void, T7 = void, T8 = void, T9 = void, T10 = void, T11 = void, T12 = void>(fn1: (t1: Out<T1>) => Chain<T2>, fn2: (t2: Out<T2>) => Chain<T3>, fn3: (t3: Out<T3>) => Chain<T4>, fn4: (t4: Out<T4>) => Chain<T5>, fn5: (t5: Out<T5>) => Chain<T6>, fn6: (t6: Out<T6>) => Chain<T7>, fn7: (t7: Out<T7>) => Chain<T8>, fn8: (t8: Out<T8>) => Chain<T9>, fn9: (t9: Out<T9>) => Chain<T10>, fn10: (t10: Out<T10>) => Chain<T11>, fn11: (t11: Out<T11>) => Chain<T12>, fn12: (t12: Out<T12>) => Chain<R>): ResultFn<T1, R>;
    <R, T1 = void, T2 = void, T3 = void, T4 = void, T5 = void, T6 = void, T7 = void, T8 = void, T9 = void, T10 = void, T11 = void, T12 = void, T13 = void>(fn1: (t1: Out<T1>) => Chain<T2>, fn2: (t2: Out<T2>) => Chain<T3>, fn3: (t3: Out<T3>) => Chain<T4>, fn4: (t4: Out<T4>) => Chain<T5>, fn5: (t5: Out<T5>) => Chain<T6>, fn6: (t6: Out<T6>) => Chain<T7>, fn7: (t7: Out<T7>) => Chain<T8>, fn8: (t8: Out<T8>) => Chain<T9>, fn9: (t9: Out<T9>) => Chain<T10>, fn10: (t10: Out<T10>) => Chain<T11>, fn11: (t11: Out<T11>) => Chain<T12>, fn12: (t12: Out<T12>) => Chain<T13>, fn13: (t13: Out<T13>) => Chain<R>): ResultFn<T1, R>;
    <R, T1 = void, T2 = void, T3 = void, T4 = void, T5 = void, T6 = void, T7 = void, T8 = void, T9 = void, T10 = void, T11 = void, T12 = void, T13 = void, T14 = void>(fn1: (t1: Out<T1>) => Chain<T2>, fn2: (t2: Out<T2>) => Chain<T3>, fn3: (t3: Out<T3>) => Chain<T4>, fn4: (t4: Out<T4>) => Chain<T5>, fn5: (t5: Out<T5>) => Chain<T6>, fn6: (t6: Out<T6>) => Chain<T7>, fn7: (t7: Out<T7>) => Chain<T8>, fn8: (t8: Out<T8>) => Chain<T9>, fn9: (t9: Out<T9>) => Chain<T10>, fn10: (t10: Out<T10>) => Chain<T11>, fn11: (t11: Out<T11>) => Chain<T12>, fn12: (t12: Out<T12>) => Chain<T13>, fn13: (t13: Out<T13>) => Chain<T14>, fn14: (t14: Out<T14>) => Chain<R>): ResultFn<T1, R>;
    <R, T1 = void, T2 = void, T3 = void, T4 = void, T5 = void, T6 = void, T7 = void, T8 = void, T9 = void, T10 = void, T11 = void, T12 = void, T13 = void, T14 = void, T15 = void>(fn1: (t1: Out<T1>) => Chain<T2>, fn2: (t2: Out<T2>) => Chain<T3>, fn3: (t3: Out<T3>) => Chain<T4>, fn4: (t4: Out<T4>) => Chain<T5>, fn5: (t5: Out<T5>) => Chain<T6>, fn6: (t6: Out<T6>) => Chain<T7>, fn7: (t7: Out<T7>) => Chain<T8>, fn8: (t8: Out<T8>) => Chain<T9>, fn9: (t9: Out<T9>) => Chain<T10>, fn10: (t10: Out<T10>) => Chain<T11>, fn11: (t11: Out<T11>) => Chain<T12>, fn12: (t12: Out<T12>) => Chain<T13>, fn13: (t13: Out<T13>) => Chain<T14>, fn14: (t14: Out<T14>) => Chain<T15>, fn15: (t15: Out<T15>) => Chain<R>): ResultFn<T1, R>;
    <R, T1 = void, T2 = void, T3 = void, T4 = void, T5 = void, T6 = void, T7 = void, T8 = void, T9 = void, T10 = void, T11 = void, T12 = void, T13 = void, T14 = void, T15 = void, T16 = void>(fn1: (t1: Out<T1>) => Chain<T2>, fn2: (t2: Out<T2>) => Chain<T3>, fn3: (t3: Out<T3>) => Chain<T4>, fn4: (t4: Out<T4>) => Chain<T5>, fn5: (t5: Out<T5>) => Chain<T6>, fn6: (t6: Out<T6>) => Chain<T7>, fn7: (t7: Out<T7>) => Chain<T8>, fn8: (t8: Out<T8>) => Chain<T9>, fn9: (t9: Out<T9>) => Chain<T10>, fn10: (t10: Out<T10>) => Chain<T11>, fn11: (t11: Out<T11>) => Chain<T12>, fn12: (t12: Out<T12>) => Chain<T13>, fn13: (t13: Out<T13>) => Chain<T14>, fn14: (t14: Out<T14>) => Chain<T15>, fn15: (t15: Out<T15>) => Chain<T16>, fn16: (t16: Out<T16>) => Chain<R>): ResultFn<T1, R>;
}
declare const pipe: Pipe;
declare const async_pipe: AsyncPipe;

declare const wait: (ms?: number) => Promise<unknown>;

export { AsyncPipe, Concurrent, Defer, Either, EitherFn, LRU, Pipe, Pipeline, Unit, async_pipe, defer, either, lock, oni, pipe, pipeline, wait };
