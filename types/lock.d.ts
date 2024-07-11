export declare const lock: <A extends unknown[], R>(init: (...args: A) => R) => (...args: A) => import("./either").Either<R>;
