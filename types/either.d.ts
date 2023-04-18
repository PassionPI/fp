import { JarChain } from "./utils/tuple";
type _Either = <A extends unknown[], R>(fn: (...args: A) => R) => (...args: A) => Promise<JarChain<R>>;
export declare const either: _Either;
export type EitherFn<A extends unknown[], R> = ReturnType<typeof either<A, R>>;
export type Either<R> = Promise<JarChain<R>>;
export {};
