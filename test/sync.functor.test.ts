import { functor, isFunctor } from "@/sync/functor";
import { add } from "rambda";
import { expect, test } from "vitest";

const prefix = (x: number) => {
  return (n: string) => n + x;
};

const add1AndPrefixA = (x: number) =>
  functor(x).map(add(1)).map(prefix).ap("A");

test("is functor", async () => {
  expect(isFunctor(add1AndPrefixA(1))).toBe(true);
});

test("functor err 1", async () => {
  const [err, data] = functor(1)
    .map(() => {
      throw 999;
    })
    //@ts-expect-error
    .map(add1AndPrefixA)
    .join();
  expect(err!.message).toBe("999");
  expect(data).toBe(null);
});

test("functor err 2", async () => {
  const [err, data] = functor((x: number) => {
    throw x;
  })
    .ap(999)
    //@ts-expect-error
    .ap(1)
    .join();
  expect(err!.message).toBe("999");
  expect(data).toBe(null);
});

test("functor add1AndPrefixA 1", async () => {
  const [err, data] = add1AndPrefixA(1).join();
  expect(err).toBe(null);
  expect(data).toBe("A2");
});

test("functor curry ap 1", async () => {
  const [err, data] = functor(add).ap(1).ap(2).join();
  expect(err).toBe(null);
  expect(data).toBe(3);
});

test("functor curry ap 2", async () => {
  const [err, data] = functor(1).map(add).ap(2).join();
  expect(err).toBe(null);
  expect(data).toBe(3);
});

test("functor nest functor 1", async () => {
  const [err, data] = functor(1).map(add1AndPrefixA).join();
  expect(err).toBe(null);
  expect(data).toBe("A2");
});

test("functor nest functor 2", async () => {
  const [err, data] = functor(add1AndPrefixA(1))
    .map((x) => x + 1)
    .join();
  expect(err).toBe(null);
  expect(data).toBe("A21");
});

test("functor nest jar 1", async () => {
  const jar = add1AndPrefixA(1).join();
  const [err, data] = functor(jar)
    .map((x) => x + 1)
    .join();
  expect(err).toBe(null);
  expect(data).toBe("A21");
});
