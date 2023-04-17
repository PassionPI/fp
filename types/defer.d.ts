export declare const defer: <T = unknown, E = unknown>() => {
    resolve: (data?: T | PromiseLike<T> | undefined) => void;
    reject: (msg?: E | undefined) => void;
    pending: Promise<T>;
};
