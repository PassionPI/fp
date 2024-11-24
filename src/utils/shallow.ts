import { is, isObj, keys } from "./object";

export function shallowEqual(o1: unknown, o2: unknown) {
  if (is(o1, o2)) {
    return true;
  }
  if (!isObj(o1) || !isObj(o2)) {
    return false;
  }
  const k1 = keys(o1);
  const k2 = keys(o1);
  if (k1.length != k2.length) {
    return false;
  }
  for (let i = 0; i < k1.length; i++) {
    const key = k1[i] as keyof typeof o1;
    if (!is(o1[key], o2[key])) {
      return false;
    }
  }
  return true;
}
