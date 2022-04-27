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
export { pipeline, Pipeline };
