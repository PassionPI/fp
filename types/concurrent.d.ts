declare const range_error_message: "Number out of range. Please use 0-20(default: 10).";
type RangeError = typeof range_error_message;
type Range = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12 | 13 | 14 | 15 | 16 | 17 | 18 | 19 | 20;
type IsValidNumber<N> = N extends number ? `${N}` extends `-${infer _Negative}` | `${number}.${infer _Float}` ? RangeError : N extends Range ? N : RangeError : never;
export declare const valid_number: <N extends number>(x?: IsValidNumber<N>) => number;
/**
 *
 * @description 并发控制函数
 *
 * 1、是否有空闲
 * 2、数量池
 * 3、排队等待
 */
type Task<T> = () => Promise<T>;
export declare const concurrent: ({ max_concurrency, }?: {
    max_concurrency?: number;
}) => {
    add: <T, N extends number = number>(task: Task<T>, { priority }?: {
        priority?: IsValidNumber<N>;
    }) => {
        pending: (() => import("./either").Either<Promise<T>>) & {
            unwrap: () => Promise<T>;
        };
        reject: (msg?: unknown) => void;
    };
    busy: () => boolean;
    clear: <N extends number>(priority?: IsValidNumber<N>) => void;
};
export {};
