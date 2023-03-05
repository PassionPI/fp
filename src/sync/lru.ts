const LRU = <K, V>(size: number) => {
  const cache = new Map<K, V>();

  return {
    get(key: K): V | undefined {
      const value = cache.get(key);
      if (cache.has(key)) {
        cache.delete(key);
        cache.set(key, value!);
      }
      return value;
    },
    set(key: K, value: V): void {
      if (cache.has(key)) {
        cache.delete(key);
      }
      cache.set(key, value);
      if (cache.size > size) {
        cache.delete(cache.keys().next().value);
      }
    },
  };
};

export { LRU };
