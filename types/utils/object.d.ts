export declare const freeze: {
    <T>(a: T[]): readonly T[];
    <T_1 extends Function>(f: T_1): T_1;
    <T_2 extends {
        [idx: string]: object | U | null | undefined;
    }, U extends string | number | bigint | boolean | symbol>(o: T_2): Readonly<T_2>;
    <T_3>(o: T_3): Readonly<T_3>;
}, create: {
    (o: object | null): any;
    (o: object | null, properties: PropertyDescriptorMap & ThisType<any>): any;
};
