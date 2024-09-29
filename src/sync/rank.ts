import { IsValidPriority, MAX, MID, valid_number } from "@/utils/valid_number";

export const createRank = <T>() => {
  const queue = Array.from({ length: MAX + 1 }, () => new Set<T>());
  const ref = {
    count: 0,
  };

  const del = (set: Set<T>, val: T) => {
    const ok = set.delete(val);
    ok && ref.count--;
    return ok;
  };

  const get = <N extends number>(priority?: IsValidPriority<N>) => {
    if (priority != null) {
      return queue[valid_number(priority)];
    }
    for (let i = MAX; i >= 0; i--) {
      if (queue[i].size > 0) {
        return queue[i];
      }
    }
    return queue[MID];
  };

  const dequeue = <N extends number>(priority?: IsValidPriority<N>) => {
    const set = get(priority);
    const val = set.values().next().value as T;
    del(set, val);
    return val;
  };

  const add = <N extends number>(val: T, priority?: IsValidPriority<N>) => {
    const set = get(priority);
    set.add(val);
    ref.count++;
    return () => del(set, val);
  };

  const all = () =>
    queue.reduceRight<T[]>((acc, x) => acc.concat(Array.from(x)), []);

  const clear = <N extends number>(
    callback?: (val: T) => void,
    priority?: IsValidPriority<N>
  ) => {
    let set = get(priority);
    while (set.size) {
      set.forEach((x) => callback?.(x));
      set.clear();
      set = get(priority);
    }
  };

  const size = () => ref.count;

  return {
    get,
    all,
    add,
    size,
    clear,
    dequeue,
  };
};
