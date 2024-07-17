import { lock, wait } from "@/index";
import { describe, expect, test } from "vitest";

const MSG = Symbol();
const time = 200;

describe.concurrent("lock", async () => {
  let count = 0;
  const fakeFetch = async () => {
    count++;
    await wait(time);
    return [MSG, count];
  };
  const wrap = lock(fakeFetch);
  test("call step1 1", async () => {
    const data = await wrap();
    expect(data).toEqual([MSG, 1]);
  });

  test("call step1 2", async () => {
    const data = await wrap();
    expect(data).toEqual([MSG, 1]);
  });

  test("call step1 end", async () => {
    await wait(time);
    expect(count).toBe(1);
  });

  test("call step2 1", async () => {
    await wait(time);
    const data = await wrap();
    expect(data).toEqual([MSG, 2]);
  });

  test("call step2 2", async () => {
    await wait(time);
    await wait(time / 2);
    const data = await wrap();
    expect(data).toEqual([MSG, 2]);
  });

  test("call step2 end", async () => {
    await wait(time * 2);
    expect(count).toBe(2);
  });
});
