import { JarChain } from "./utils/tuple";
interface Either {
    <A extends unknown[], R>(fn: (...args: A) => R): (...args: A) => Promise<JarChain<R>>;
}
export declare const either: Either;
export {};
