declare class Tuple<T> extends Array<T> {
}
export declare const freeze: {
    <T>(a: T[]): readonly T[];
    <T_1 extends Function>(f: T_1): T_1;
    <T_2>(o: T_2): Readonly<T_2>;
};
export declare const isTuple: (x: unknown) => x is Tuple<unknown>;
export declare const tupleErr: (v?: unknown) => [Error, null];
export declare const tupleVal: <T>(v: T) => [null, T];
export declare const tuples: readonly [<T>(v: T) => [null, T], (v?: unknown) => [Error, null]];
export {};
