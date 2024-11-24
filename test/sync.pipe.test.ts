import { flow } from "@/index";
import { expect, test } from "vitest";

test("flow", async () => {
  const f = async (x: number) => {
    return Promise.resolve(x + 1);
  };
  const g = async (x: number) => {
    return Promise.resolve(x * 2);
  };
  const h = async (x: number) => {
    return Promise.resolve(x + 3);
  };
  const data = await flow(f, g, h)(3);
  expect(data).toBe(11);
});
