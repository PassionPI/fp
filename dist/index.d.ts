interface Either {
    <A extends unknown[], R>(fn: (...args: A) => R): <E = unknown>(...args: A) => Promise<[E, R extends Promise<infer U> ? U : R]>;
}
declare const either: Either;

declare const interval: (ms?: number | undefined) => {
    loop: (fn: () => void | Promise<void>, onErr?: (e: any) => void) => Promise<void>;
    stop: () => void;
};

declare const pended: () => {
    resolve: () => void;
    reject: () => void;
    pending: Promise<void>;
};

declare type JoinPipePromise<T> = T extends PipePromise<infer U> | Promise<infer U> ? JoinPipePromise<U> : PipePromise<T>;
declare type Pipeline<T> = JoinPipePromise<T>;
declare class PipePromise<X> extends Promise<[unknown, X]> {
    pipe<R>(f: (x: X) => R): Pipeline<R>;
}
declare const pipeline: {
    <T>(f: (res: (x: T) => void, rej: (x: any) => void) => void): JoinPipePromise<T>;
    resolve<T_1>(x?: T_1 | undefined): JoinPipePromise<T_1>;
    reject<T_2>(x?: T_2 | undefined): JoinPipePromise<T_2>;
};

declare const wait: (ms?: number | undefined) => Promise<unknown>;

export { Pipeline, either, interval, pended, pipeline, wait };
