import { JarChain } from "./utils/tuple";
export declare type Either = <A extends unknown[], R>(fn: (...args: A) => R) => (...args: A) => Promise<JarChain<R>>;
export declare const either: Either;
