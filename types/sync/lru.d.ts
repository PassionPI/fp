declare const LRU: <K, V>(size: number) => {
    get(key: K): V | undefined;
    set(key: K, value: V): void;
};
export { LRU };
