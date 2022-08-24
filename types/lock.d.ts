export declare const lock: <A extends unknown[], R>(init: (...args: A) => R) => (...args: A) => Promise<import("./utils/tuple").JarChain<R>>;
