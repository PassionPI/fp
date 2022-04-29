export declare const interval: (ms?: number | undefined) => {
    loop: (fn: () => void | Promise<void>, onErr?: (e: any) => void) => Promise<void>;
    stop: () => void;
};
