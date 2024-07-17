import { concurrent, wait } from "@/index";
import { valid_number } from "@/utils/valid_number";
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

describe.concurrent("concurrent base", async () => {
  const instance = concurrent();
  test("busy", async () => {
    const instance = concurrent();
    const start_time = Date.now();
    const p1 = instance.add(task1);
    expect(instance.busy()).eq(false);
    const p2 = instance.add(task2);
    expect(instance.busy()).eq(true);
    const p3 = instance.add(task3);
    expect(instance.busy()).eq(true);
    await wait(task1Time);
    expect(instance.busy()).eq(true);
    await wait(task3Time + 5);
    expect(instance.busy()).eq(false);
    await p2.pending;
    const end_time = Date.now();
    expect(end_time - start_time).gte(task2Time);
  });
  test("priority", async () => {
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
    await Promise.all([
      p1.pending,
      p2.pending,
      p3.pending,
      p4.pending,
      p5.pending,
      p6.pending,
    ]);
    expect(seq).toEqual([1, 2, 5, 4, 3, 6]);
  });
});

describe.concurrent("concurrent dep", async () => {
  test("reject pending", async () => {
    expect(valid_number()).eq(10);
    //@ts-expect-error
    expect(valid_number(100)).eq(20);
    //@ts-expect-error
    expect(valid_number(-90)).eq(0);
    expect(valid_number(15)).eq(15);
  });
});
