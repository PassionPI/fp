export declare const lock: <A extends unknown[], R>(fn: (...args: A) => R) => <X = R>(...args: A) => Promise<[Error | null, Awaited<X>]>;
