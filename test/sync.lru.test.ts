import { LRU } from "@/sync/lru";
import { expect, test } from "vitest";

const kv1 = [1, "a"];
const kv2 = [2, "b"];
const kv3 = [3, "c"];
const kv4 = [4, "d"];
const kv5 = [5, "e"];

test("cache 1", async () => {
  const cache = LRU(3);

  cache.set(kv1[0], kv1[1]);
  expect(cache.get(kv1[0])).toBe(kv1[1]);

  cache.set(kv2[0], kv2[1]);
  expect(cache.get(kv2[0])).toBe(kv2[1]);

  cache.set(kv3[0], kv3[1]);
  expect(cache.get(kv3[0])).toBe(kv3[1]);

  cache.set(kv4[0], kv4[1]);
  expect(cache.get(kv4[0])).toBe(kv4[1]);
  expect(cache.get(kv1[0])).toBe(undefined);

  cache.set(kv2[0], kv2[1]);
  cache.set(kv3[0], kv3[1]);
  cache.set(kv4[0], kv4[1]);
  expect(cache.get(kv2[0])).toBe(kv2[1]);
});
