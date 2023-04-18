import { defer, wait } from "@/index";
import { describe, expect, test } from "vitest";

const time = 200;

describe.concurrent("defer resolve", async () => {
  const { pending, resolve } = defer<void>();
  test("await pending resolve", async () => {
    let t1 = Date.now().valueOf();
    await pending();
    let t2 = Date.now().valueOf();
    expect(t2 - t1).gte(time);
  });
  test("resolve pending", async () => {
    await wait(time);
    resolve();
  });
});

// describe.concurrent("defer reject", async () => {
//   const { pending, reject } = defer();
//   test.fails("await pending reject", async () => {
//     await pending;
//   });
//   test("reject pending", async () => {
//     reject();
//   });
// });
