export declare const freeze: {
    <T extends Function>(f: T): T;
    <T extends {
        [idx: string]: U | null | undefined | object;
    }, U extends string | bigint | number | boolean | symbol>(o: T): Readonly<T>;
    <T>(o: T): Readonly<T>;
}, create: {
    (o: object | null): any;
    (o: object | null, properties: PropertyDescriptorMap & ThisType<any>): any;
};
