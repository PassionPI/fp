import { wait } from "@/index";
import { expect, test } from "vitest";

const time = 200;

test("wait time cost", async () => {
  let t1 = Date.now().valueOf();
  await wait(time);
  let t2 = Date.now().valueOf();
  expect(t2 - t1).gte(time);
});

test("wait no error", async () => {
  const errSymbol = Symbol();
  const [err, result] = await wait(time).then(
    () => [errSymbol, "ok"],
    (e) => [e, null]
  );
  expect(err).toBe(errSymbol);
  expect(result).toBe("ok");
});
