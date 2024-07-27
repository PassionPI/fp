import { valid_number } from "@/utils/valid_number";
import { defer } from "./defer";
import { IsValidPriority, MAX, MID } from "./utils/valid_number";

type TaskConfig<N extends number> = {
  priority?: IsValidPriority<N>;
  tag?: string;
};

type Task<T> = () => Promise<T>;

type TaskItem<T> = TaskConfig<number> & {
  task: Task<T>;
  resolve: (value: T) => void;
  reject: (reason?: unknown) => void;
};

type AnyTaskItem = TaskItem<any>;

export const createSchedular = ({
  concurrent = 2,
}: { concurrent?: number } = {}) => {
  const ref: {
    concurrent: number;
    running: Set<AnyTaskItem>;
    queue: Array<Set<AnyTaskItem>>;
  } = {
    concurrent,
    running: new Set(),
    queue: Array.from({ length: MAX + 1 }, () => new Set()),
  };

  const getQueue = <N extends number>(priority?: IsValidPriority<N>) => {
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
    cfg?: TaskConfig<N>
  ) => {
    const x = defer<T>();
    const queue = getQueue((cfg?.priority ?? MID) as IsValidPriority<N>);
    const resolve = x.resolve;
    const pending = x.pending;
    const reject: (typeof x)["reject"] = (msg) => {
      x.reject(msg);
      queue.delete(item);
    };
    const item = { ...cfg, task, resolve, reject } as AnyTaskItem;
    queue.add(item);
    next();
    return { pending, reject };
  };

  const idle = (): boolean => {
    return ref.running.size < ref.concurrent;
  };

  const clear = <N extends number>(priority?: IsValidPriority<N>): void => {
    let queue = getQueue(priority);
    while (queue.size) {
      queue.forEach((x) => x.reject());
      queue.clear();
      queue = getQueue(priority);
    }
  };

  const tasks = () => {
    const running = Array.from(ref.running);
    const queue = ref.queue.reduceRight<AnyTaskItem[]>(
      (acc, x) => acc.concat(Array.from(x)),
      []
    );
    return { running, queue };
  };

  const next = (): void => {
    for (let queue = getQueue(); idle() && queue.size; queue = getQueue()) {
      const x: AnyTaskItem = queue.values().next().value;

      ref.running.add(x);

      queue.delete(x);

      Promise.resolve()
        .then(x.task)
        .then(x.resolve)
        .catch(x.reject)
        .finally(() => {
          ref.running.delete(x);
          next();
        });
    }
  };

  return {
    add,
    idle,
    clear,
    tasks,
  };
};
