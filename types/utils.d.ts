export declare const freeze: {
    <T>(a: T[]): readonly T[];
    <T_1 extends Function>(f: T_1): T_1;
    <T_2>(o: T_2): Readonly<T_2>;
};
export declare const isTuple: (x: unknown) => boolean;
export declare const tupleErr: <T>(v: T) => any;
export declare const tupleVal: <T>(v: T) => any;
export declare const tuple: any;
