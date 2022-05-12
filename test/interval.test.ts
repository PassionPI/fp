import { interval, wait } from "@/index";
import { describe, expect, test } from "vitest";

const time = 200;
const gap = time / 5;

describe.concurrent("pended resolve", async () => {
  const { loop, stop } = interval(gap);
  test("await pending resolve", async () => {
    let t1 = Date.now().valueOf();
    await loop(() => {});
    let t2 = Date.now().valueOf();
    expect(t2 - t1).gte(time);
  });
  test("resolve pending", async () => {
    await wait(time);
    stop();
  });
});
