export declare const interval: (ms?: number | undefined) => {
    loop: <X = Promise<void>>(fn: () => void | Promise<void>) => Promise<import("./utils/tuple").Jar<X>>;
    stop: () => void;
};
