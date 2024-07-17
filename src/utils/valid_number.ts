export const MIN = 0;
export const MAX = 20;
export const MID = 10;
const range_error_message =
  `Number out of range. Please use ${MIN}-${MAX}(default: ${MID}).` as const;
type RangeError = typeof range_error_message;
type Range =
  | 0
  | 1
  | 2
  | 3
  | 4
  | 5
  | 6
  | 7
  | 8
  | 9
  | 10
  | 11
  | 12
  | 13
  | 14
  | 15
  | 16
  | 17
  | 18
  | 19
  | 20;

export type IsValidPriority<N> = N extends number
  ? `${N}` extends `-${infer _Negative}` | `${number}.${infer _Float}`
    ? RangeError
    : N extends Range
    ? N
    : RangeError
  : never;

export const valid_number = <N extends number>(x?: IsValidPriority<N>) => {
  if (typeof x != "number") {
    return MID;
  }
  return Math.floor(Math.max(MIN, Math.min(MAX, x)));
};
