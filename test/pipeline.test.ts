import { pipeline } from "@/index";
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
  const [err, data] = await pipeline(1)
    .pipe((x) => {
      throw x + 1;
    })
    //@ts-expect-error
    .pipe((x) => Promise.resolve(x + "1"));
  expect(err instanceof Error).toBe(true);
  expect(err.message).toBe("2");
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
