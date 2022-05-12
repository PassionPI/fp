import { isTuple, tupleErr, tupleVal } from "@/tuple";
import { expect, test } from "vitest";

const msg_err = "msg_err";
const msg_ok = "msg_ok";
const base_tuple_err_no_msg = tupleErr();
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
  expect(err instanceof Error).toBe(true);
  expect(err.message).toBe("undefined");
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
  expect(err instanceof Error).toBe(true);
  expect(err.message).toBe("undefined");
});

test("nest err", async () => {
  const [err, data] = tupleErr(base_tuple_err);
  expect(data).toBeNull();
  expect(err instanceof Error).toBe(true);
  expect(err.message).toBe(msg_err);
});

test("nest val", async () => {
  const [err, data] = tupleVal(base_tuple_ok);
  expect(data).toBe(msg_ok);
  expect(err).toBeNull();
});

test("nest val -> err", async () => {
  const [err, data] = tupleVal(base_tuple_err);
  expect(data).toBeNull();
  //@ts-expect-error
  expect(err instanceof Error).toBe(true);
  //@ts-expect-error
  expect(err.message).toBe(msg_err);
});

test("nest err -> val", async () => {
  const [err, data] = tupleErr(base_tuple_ok);
  expect(data).toBeNull();
  expect(err instanceof Error).toBe(true);
  expect(err.message).toBe("undefined");
});
