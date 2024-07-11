import { concurrent, wait } from "@/index";
import { describe, expect, test } from "vitest";

const task1Time = 50;
const task2Time = 80;
const task3Time = 30;

const task1 = async () => {
  await wait(task1Time);
  console.log("task1 done", Date.now());
};
const task2 = async () => {
  await wait(task2Time);
  console.log("task2 done", Date.now());
};
const task3 = async () => {
  await wait(task3Time);
  console.log("task3 done", Date.now());
};

describe.concurrent("concurrent reject", async () => {
  test("reject ", async () => {
    const instance = concurrent();
    const seq: number[] = [];
    const p1 = instance.add(async () => {
      seq.push(1);
      await wait(task1Time);
    });
    const p2 = instance.add(async () => {
      seq.push(2);
      await wait(task2Time);
    });
    const p3 = instance.add(
      async () => {
        seq.push(3);
        await wait(task2Time);
      },
      { priority: 5 }
    );
    const p4 = instance.add(
      async () => {
        seq.push(4);
        await wait(task2Time);
      },
      { priority: 15 }
    );
    const p5 = instance.add(
      async () => {
        seq.push(5);
        await wait(task2Time);
      },
      { priority: 20 }
    );
    const p6 = instance.add(
      async () => {
        seq.push(6);
        await wait(task2Time);
      },
      { priority: 0 }
    );
    p1.reject();
    p5.reject();
    await Promise.all([
      p1.pending(),
      p2.pending(),
      p3.pending(),
      p4.pending(),
      p5.pending(),
      p6.pending(),
    ]);
    expect(seq).toEqual([1, 2, 4, 3, 6]);
  });
});
