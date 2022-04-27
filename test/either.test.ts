import { either } from "@/index";
import { expect, test } from "vitest";

const ERR_MSG = Symbol();
const OK_MSG = Symbol();

const promiseErr = () => {
  return Promise.reject(ERR_MSG);
};

const promiseErrNoMsg = () => {
  return Promise.reject();
};

const promiseErrFalsy = () => {
  return Promise.reject("");
};

const promiseOk = () => {
  return Promise.resolve(OK_MSG);
};

test("either Err", async () => {
  const wrap = either(promiseErr);
  const [err, data] = await wrap();
  expect(err).toBe(ERR_MSG);
  expect(data).toBe(null);
});

test("either Err No Msg", async () => {
  const wrap = either(promiseErrNoMsg);
  const [err, data] = await wrap();
  expect(err).toBeTruthy();
  expect(data).toBe(null);
});

test("either Err Falsy", async () => {
  const wrap = either(promiseErrFalsy);
  const [err, data] = await wrap();
  expect(err).toBeTruthy();
  expect(data).toBe(null);
});

test("either Ok", async () => {
  const wrap = either(promiseOk);
  const [err, data] = await wrap();
  expect(err).toBe(null);
  expect(data).toBe(OK_MSG);
});
