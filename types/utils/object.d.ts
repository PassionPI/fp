export declare const freeze: {
    <T extends Function>(f: T): T;
    <T_1 extends {
        [idx: string]: object | U | null | undefined;
    }, U extends string | number | bigint | boolean | symbol>(o: T_1): Readonly<T_1>;
    <T_2>(o: T_2): Readonly<T_2>;
}, create: {
    (o: object | null): any;
    (o: object | null, properties: PropertyDescriptorMap & ThisType<any>): any;
};
