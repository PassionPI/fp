import { JarChain } from "./utils/tuple";
export declare const either: <A extends unknown[], R>(fn: (...args: A) => R) => (...args: A) => Either<R>;
export type EitherFn<A extends unknown[], R> = ReturnType<typeof either<A, R>>;
export type Either<R> = Promise<JarChain<R>>;
