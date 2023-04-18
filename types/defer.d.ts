export declare const defer: <T = void, E = unknown>() => {
    resolve: (data: T | PromiseLike<T>) => void;
    reject: (msg?: E | undefined) => void;
    pending: (() => Promise<import("./utils/tuple").JarChain<Promise<T>>>) & {
        unwrap: () => Promise<T>;
    };
};
export type Defer<T = void, E = unknown> = ReturnType<typeof defer<T, E>>;
