import { wait } from "@/index";
import { interval } from "@/interval";
import { describe, expect, test } from "vitest";

const time = 200;
const gap = time / 5;

describe.concurrent("interval", async () => {
  const { loop, stop } = interval(gap)(() => {});
  test("interval loop & time cost", async () => {
    let t1 = Date.now().valueOf();
    await loop();
    let t2 = Date.now().valueOf();
    expect(t2 - t1).gte(time);
  });
  test("interval stop", async () => {
    await wait(time);
    stop();
  });
});
