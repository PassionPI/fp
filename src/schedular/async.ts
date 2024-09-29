import { createRank } from "@/sync/rank";
import { IsValidPriority, MID } from "@/utils/valid_number";
import { defer } from "../defer";

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

export const createAsyncSchedular = ({
  concurrent = 2,
}: { concurrent?: number } = {}) => {
  const rank = createRank<AnyTaskItem>();

  const ref: {
    concurrent: number;
    running: Set<AnyTaskItem>;
  } = {
    concurrent,
    running: new Set(),
  };

  const add = <T, N extends number = number>(
    task: Task<T>,
    cfg?: TaskConfig<N>
  ) => {
    const { pending, resolve, reject: rej } = defer<T>();
    const reject: typeof rej = (msg) => {
      rej(msg);
      del();
    };
    const item = {
      ...cfg,
      task,
      reject,
      resolve,
    } as AnyTaskItem;
    const del = rank.add(item, (cfg?.priority ?? MID) as IsValidPriority<N>);
    next();
    return { pending, reject };
  };

  const idle = (): boolean => {
    return ref.running.size < ref.concurrent;
  };

  const clear = <N extends number>(priority?: IsValidPriority<N>): void => {
    rank.clear((x) => x.reject(), priority);
  };

  const tasks = () => {
    const running = Array.from(ref.running);
    const pending = rank.all();
    return { running, pending };
  };

  const next = (): void => {
    while (idle() && rank.size()) {
      const x = rank.dequeue();

      ref.running.add(x);

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
