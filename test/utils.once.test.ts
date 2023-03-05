import { once } from "@/utils/once";
import { expect, test } from "vitest";

let count = 0;
let func = once(() => {
  count++;
});

test("multiple", async () => {
  func();
  expect(count).toBe(1);
  func();
  expect(count).toBe(1);
  func();
  expect(count).toBe(1);
});
