export declare const lock: <A extends unknown[], R>(init?: ((...args: A) => R) | undefined) => <X = R>(...args: A) => Promise<import("./utils/tuple").Jar<X>>;
