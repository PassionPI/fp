type MapKey = string | number | symbol | object;

export const LRU = <K extends MapKey, V>(size: number) => {
  const cache = new Map<K, V | undefined>();
  const del = (key: K) => cache.delete(key);
  const has = (key: K) => cache.has(key);
  const add = (key: K, value?: V) => cache.set(key, value);
  const tail_key = () => cache.keys().next().value as K;
  const move_to_head = (key: K, value?: V) => {
    del(key);
    add(key, value);
  };
  return {
    del,
    has,
    get(key: K): V | undefined {
      if (has(key)) {
        const value = cache.get(key);
        move_to_head(key, value);
        return value;
      }
    },
    set(key: K, value: V): void {
      move_to_head(key, value);
      if (cache.size > size) {
        del(tail_key());
      }
    },
  };
};

export const withLRU = <A extends unknown[], R>(
  fn: (...args: A) => R,
  getKey: (...args: A) => MapKey,
  size: number = 10
) => {
  const cache = LRU<MapKey, R>(size);
  return (...args: A): R => {
    const key = getKey(...args);
    if (!cache.has(key)) {
      cache.set(key, fn(...args) as R);
    }
    return cache.get(key) as R;
  };
};
