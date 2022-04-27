import { pipeline } from "@/index";
import { expect, test } from "vitest";

test("pipeline", async () => {
  const [err, data] = await pipeline
    .resolve(1)
    .pipe((x) => Promise.resolve(x + 1));
  expect(err).toBe(null);
  expect(data).toBe(2);
});
