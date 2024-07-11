declare class Tuple<T> extends Array<T> {
}
export declare const isTuple: (x: unknown) => x is Tuple<unknown>;
export declare const tupleErr: (v?: unknown) => [Error, null];
export declare const tupleVal: <T>(v: T) => Jar<T>;
export declare const tuples: readonly [<T>(v: T) => Jar<T>, (v?: unknown) => [Error, null]];
export type Jar<T> = [Error | null, Awaited<T>];
export type JarChain<T> = Jar<JarJoin<T>>;
export type JarJoin<T> = T extends Jar<infer U> ? JarJoin<U> : Awaited<T>;
export {};
