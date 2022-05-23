export declare const interval: (ms?: number | undefined) => {
    loop: (fn: () => void | Promise<void>) => Promise<import("./utils/tuple").Jar<Promise<void>>>;
    stop: () => void;
};
