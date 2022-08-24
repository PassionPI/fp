export declare const terminable: <A extends unknown[], R>(fn: (...args: A) => Promise<R>) => (...args: A) => {
    abort: (reason?: any) => void;
    pending: Promise<import("./utils/tuple").Jar<Promise<R>>>;
};
