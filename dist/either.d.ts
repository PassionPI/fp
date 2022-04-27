interface Either {
    <A extends unknown[], R>(fn: (...args: A) => R): <E = unknown>(...args: A) => Promise<[E, R extends Promise<infer U> ? U : R]>;
}
export declare const either: Either;
export {};
