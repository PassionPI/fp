import { either } from "@/index";
import { expect, test } from "vitest";

const ERR_MSG = Symbol();
const OK_MSG1 = Symbol();
const OK_MSG2 = Symbol();

const promiseErr = () => {
  return Promise.reject(ERR_MSG);
};

const promiseErrNoMsg = () => {
  return Promise.reject();
};

const promiseErrFalsy = () => {
  return Promise.reject("");
};

const promiseOk1 = () => {
  return Promise.resolve(OK_MSG1);
};

const promiseOk2 = () => {
  return Promise.resolve(OK_MSG2);
};

test("either Err", async () => {
  const wrap = either(promiseErr);
  const [err, data] = await wrap();
  expect(err instanceof Error).toBe(true);
  expect(data).toBe(null);
});

test("either Err No Msg", async () => {
  const wrap = either(promiseErrNoMsg);
  const [err, data] = await wrap();
  expect(err instanceof Error).toBe(true);
  expect(data).toBe(null);
});

test("either Err Falsy", async () => {
  const wrap = either(promiseErrFalsy);
  const [err, data] = await wrap();
  expect(err instanceof Error).toBe(true);
  expect(data).toBe(null);
});

test("either Ok", async () => {
  const wrap = either(promiseOk1);
  const [err, data] = await wrap();
  expect(err).toBe(null);
  expect(data).toBe(OK_MSG1);
});

test("either Ok nest either Ok", async () => {
  const wrap1 = either(promiseOk1);
  const wrap2 = either(async () => {
    const result = await wrap1();
    return result;
  });
  const [err, data] = await wrap2();
  expect(err).toBe(null);
  expect(data).toBe(OK_MSG1);
});
