import { valid_number } from "@/utils/valid_number";
import { defer } from "./defer";
import { IsValidNumber, MAX, MID } from "./utils/valid_number";

/**
 *
 * @description 并发控制函数
 *
 * 1、是否有空闲
 * 2、数量池
 * 3、排队等待
 */
type Task<T> = () => Promise<T>;

type TaskItem<T> = {
  task: Task<T>;
  resolve: (value: T) => void;
  reject: (reason?: unknown) => void;
};

type AnyTaskItem = TaskItem<any>;

export const concurrent = ({
  max_concurrency = 2,
}: { max_concurrency?: number } = {}) => {
  const ref: {
    max_concurrency: number;
    current_count: number;
    queue: Set<AnyTaskItem>[];
  } = {
    max_concurrency,
    current_count: 0,
    queue: Array.from({ length: MAX + 1 }, () => new Set()),
  };

  const get_queue = <N extends number>(priority?: IsValidNumber<N>) => {
    if (priority != null) {
      const x = valid_number(priority);
      return ref.queue[x];
    }
    for (let i = MAX; i >= 0; i--) {
      if (ref.queue[i].size > 0) {
        return ref.queue[i];
      }
    }
    return ref.queue[MID];
  };

  const add = <T, N extends number = number>(
    task: Task<T>,
    { priority }: { priority?: IsValidNumber<N> } = {}
  ) => {
    const x = defer<T>();
    const queue = get_queue((priority ?? MID) as IsValidNumber<N>);
    const resolve = x.resolve;
    const pending = x.pending;
    const reject: (typeof x)["reject"] = (msg) => {
      x.reject(msg);
      queue.delete(item);
    };
    const item = { task, resolve, reject };
    queue.add(item);
    next();
    return { pending, reject };
  };

  const busy = (): boolean => {
    return ref.current_count === ref.max_concurrency;
  };

  const clear = <N extends number>(priority?: IsValidNumber<N>): void => {
    let queue = get_queue(priority);
    while (queue.size) {
      queue.forEach((x) => x.reject());
      queue.clear();
      queue = get_queue(priority);
    }
  };

  const next = (): void => {
    let queue = get_queue();
    while (!busy() && queue.size) {
      ref.current_count++;
      const item: AnyTaskItem = queue.values().next().value;
      const { task, reject, resolve } = item;
      queue.delete(item);
      queue = get_queue();
      Promise.resolve()
        .then(task)
        .then(resolve)
        .catch(reject)
        .finally(() => {
          ref.current_count--;
          next();
        });
    }
  };

  return {
    add,
    busy,
    clear,
  };
};
