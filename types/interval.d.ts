export declare const interval: import("./utils/curry").CurriedFunction2<number, () => void | Promise<void>, {
    loop: () => import("./either").Either<Promise<void>>;
    stop: () => void;
}>;
