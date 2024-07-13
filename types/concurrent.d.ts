import { IsValidNumber } from "./utils/valid_number";
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
