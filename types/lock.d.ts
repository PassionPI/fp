export declare const lock: <A extends unknown[], R>(init?: ((...args: A) => R) | undefined) => (...args: A) => Promise<import("./utils/tuple").JarChain<R>>;
