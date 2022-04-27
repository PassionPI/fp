import { pended, wait } from "@/index";
import { describe, expect, test } from "vitest";

const time = 200;

describe.concurrent("pended resolve", async () => {
  const { pending, resolve } = pended();
  test("await pending resolve", async () => {
    let t1 = Date.now().valueOf();
    await pending;
    let t2 = Date.now().valueOf();
    expect(t2 - t1).gte(time);
  });
  test("resolve pending", async () => {
    await wait(time);
    resolve();
  });
});

describe.concurrent("pended reject", async () => {
  const { pending, reject } = pended();
  test.fails("await pending reject", async () => {
    await pending;
  });
  test("reject pending", async () => {
    reject();
  });
});
