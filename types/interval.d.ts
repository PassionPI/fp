export declare const interval: import("./utils/curry").CurriedFunction2<number, () => void | Promise<void>, {
    loop: () => Promise<import("./utils/tuple").JarChain<Promise<void>>>;
    stop: () => void;
}>;
