/**
 *
 * @description 并发控制函数
 *
 * 1、是否有空闲
 * 2、数量池
 * 3、排队等待
 */
type Task<T> = () => Promise<T>;
export declare class Concurrent {
    #private;
    static of(...args: ConstructorParameters<typeof Concurrent>): Concurrent;
    constructor(config?: {
        max_concurrency?: number;
    });
    add: <T>(task: Task<T>) => Promise<T>;
    busy: () => boolean;
    clear: () => void;
}
export {};
