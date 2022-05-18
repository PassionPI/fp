import { Jar } from "./utils/tuple";
interface Either {
    <A extends unknown[], R>(fn: (...args: A) => R): <X = R>(...args: A) => Promise<Jar<X>>;
}
export declare const either: Either;
export {};
