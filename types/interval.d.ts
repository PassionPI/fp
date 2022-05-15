export declare const interval: (ms?: number | undefined) => {
    loop: <X = Promise<void>>(fn: () => void | Promise<void>) => Promise<[Error | null, Awaited<X>]>;
    stop: () => void;
};
