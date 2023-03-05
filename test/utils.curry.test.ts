import { curry3, _ } from "@/utils/curry";
import { expect, test } from "vitest";

const add = curry3((x: number, y: number, z: number) => x + y + z);

test("placeholder 1", async () => {
  const f1 = add(1);
  const f2 = f1(_, 2);
  const result = f2(1);
  expect(result).toBe(4);
});
