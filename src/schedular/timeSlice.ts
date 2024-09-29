import { createRank } from "@/sync/rank";
import { IsValidPriority } from "@/utils/valid_number";

type Work = () => void;

export const createTimeSliceScheduler = () => {
  const slice = 6; // 单位毫秒
  const rank = createRank<Work>();
  const channel = new MessageChannel();

  let idle = true;

  const now = () => Date.now();
  const run = () => channel.port2.postMessage(null);

  const add = <N extends number>(
    works: Work[],
    priority?: IsValidPriority<N>
  ) => {
    const del = works.map((w) => rank.add(w, priority));
    if (idle) {
      idle = false;
      run();
    }
    return () => del.forEach((x) => x());
  };

  channel.port1.onmessage = () => {
    const start = now();

    while (rank.size()) {
      rank.dequeue()();
      if (now() - start > slice) {
        run();
        return;
      }
    }

    idle = true;
  };

  return {
    add,
    idle: () => idle,
    clear: <N extends number>(priority?: IsValidPriority<N>) =>
      rank.clear(() => {}, priority),
  };
};
