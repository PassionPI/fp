import { isTuple, tupleErr, tupleVal } from "@/utils";
import { expect, test } from "vitest";

const msg_err = Symbol();
const msg_ok = Symbol();
const base_tuple_err_no_msg = tupleErr(undefined);
const base_tuple_err = tupleErr(msg_err);
const base_tuple_ok = tupleVal(msg_ok);

test("isTuple", async () => {
  expect(isTuple(base_tuple_ok)).toBe(true);
  expect(isTuple(base_tuple_err)).toBe(true);
  expect(isTuple(base_tuple_err_no_msg)).toBe(true);
});

test("val", async () => {
  const [err, data] = base_tuple_ok;
  expect(data).toBe(msg_ok);
  expect(err).toBeNull();
});

test("no message Error", async () => {
  const [err, data] = base_tuple_err_no_msg;
  expect(data).toBeNull();
  expect(err).toBeTruthy();
});

test("nest isTuple", async () => {
  expect(isTuple(tupleErr(base_tuple_ok))).toBe(true);
  expect(isTuple(tupleVal(base_tuple_ok))).toBe(true);
  expect(isTuple(tupleErr(base_tuple_err))).toBe(true);
  expect(isTuple(tupleVal(base_tuple_err))).toBe(true);
});

test("nest err no message", async () => {
  const [err, data] = tupleErr(base_tuple_err_no_msg);
  expect(data).toBeNull();
  expect(err).toBeTruthy();
});

test("nest err", async () => {
  const [err, data] = tupleErr(base_tuple_err);
  expect(data).toBeNull();
  expect(err).toBe(msg_err);
});

test("nest val", async () => {
  const [err, data] = tupleVal(base_tuple_ok);
  expect(data).toBe(msg_ok);
  expect(err).toBeNull();
});
