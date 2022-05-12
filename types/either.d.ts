interface Either {
    <A extends unknown[], R>(fn: (...args: A) => R): <X = R>(...args: A) => Promise<[Error | null, Awaited<X>]>;
}
export declare const either: Either;
export {};
