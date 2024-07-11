export declare const defer: <T = void, E = unknown>() => {
    resolve: (data: T | PromiseLike<T>) => void;
    reject: (msg?: E) => void;
    pending: (() => import("./either").Either<Promise<T>>) & {
        unwrap: () => Promise<T>;
    };
};
export type Defer<T = void, E = unknown> = ReturnType<typeof defer<T, E>>;
