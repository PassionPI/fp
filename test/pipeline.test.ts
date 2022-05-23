import { either, pipeline } from "@/index";
import { add } from "rambda";
import { expect, test } from "vitest";

test("pipeline base 1", async () => {
  const [err, data] = await pipeline(1).pipe((x) => Promise.resolve(x + 1));
  expect(err).toBe(null);
  expect(data).toBe(2);
});

test("pipeline base 2", async () => {
  const [err, data] = await pipeline(1)
    .pipe((x) => Promise.resolve(x + 1))
    .pipe((x) => Promise.resolve(x + "1"));
  expect(err).toBe(null);
  expect(data).toBe("21");
});

test("pipeline base reject 1", async () => {
  const [err, data] = await pipeline(1)
    .pipe((x) => Promise.reject(x + 1))
    //@ts-expect-error
    .pipe((x) => Promise.resolve(x + "1"));
  expect(err instanceof Error).toBe(true);
  expect(err.message).toBe("2");
  expect(data).toBe(null);
});

test("pipeline base reject 2", async () => {
  const err_add = (async (x: number) => {
    throw x + 1;
  }) as any as (x: number) => Promise<number>;
  const [err, data] = await pipeline(1)
    .pipe(err_add)
    .pipe((x) => Promise.resolve(x + "1"));
  expect(err instanceof Error).toBe(true);
  expect(err!.message).toBe("2");
  expect(data).toBe(null);
});

test("pipeline nest  arr", async () => {
  const [err, data] = await pipeline(1).pipe((x) => [x + 1, x + 2]);
  expect(err).toBe(null);
  expect(data).toEqual([2, 3]);
});

test("pipeline nest Promise arr 1", async () => {
  const [err, data] = await pipeline(1).pipe((x) =>
    Promise.resolve([x + 1, x + 2] as const)
  );
  expect(err).toBe(null);
  expect(data).toEqual([2, 3]);
});

test("pipeline nest Promise arr 2", async () => {
  const [err, data] = await pipeline(1).pipe((x) =>
    Promise.resolve([x + 1, x + 2])
  );
  expect(err).toBe(null);
  expect(data).toEqual([2, 3]);
});

test("pipeline nest pipeline", async () => {
  const p1 = pipeline(1);
  const [err, data] = await pipeline()
    .pipe(() => p1)
    .pipe((x) => Promise.resolve([x + 1, x + 2]));
  expect(err).toBe(null);
  expect(data).toEqual([2, 3]);
});

test("pipeline nest either", async () => {
  const wrap = either(() => Promise.resolve(1));
  const [err, data] = await pipeline()
    .pipe(wrap)
    .pipe((x) => x);
  expect(err).toBe(null);
  expect(data).toEqual(1);
});

test("pipeline ap 1", async () => {
  const base = (x: number) => Promise.resolve(x);
  const wrap = either(base);
  const [err, data] = await pipeline(wrap).ap(1);
  expect(err).toBe(null);
  expect(data).toEqual(1);
});

test("pipeline ap 2", async () => {
  const base = async (x: number) => async (y: string) =>
    Promise.resolve({ value: String(x) + y });
  const [err, data] = await pipeline(base).ap(1).ap("2");
  expect(err).toBe(null);
  expect(data).toEqual({ value: "12" });
});

test("pipeline ap 3", async () => {
  const [err, data] = await pipeline(add).ap(1).ap(2);
  expect(err).toBe(null);
  expect(data).toEqual(3);
});

test("pipeline ap err 1", async () => {
  const base = (x: number) =>
    Promise.reject(x) as any as (y: string) => Promise<string>;
  const [err, data] = await pipeline(base).ap(1).ap("2");
  expect(err instanceof Error).toBe(true);
  expect(err?.message).toBe("1");
  expect(data).toEqual(null);
});
