export declare const MIN = 0;
export declare const MAX = 20;
export declare const MID = 10;
declare const range_error_message: "Number out of range. Please use 0-20(default: 10).";
type RangeError = typeof range_error_message;
type Range = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12 | 13 | 14 | 15 | 16 | 17 | 18 | 19 | 20;
export type IsValidNumber<N> = N extends number ? `${N}` extends `-${infer _Negative}` | `${number}.${infer _Float}` ? RangeError : N extends Range ? N : RangeError : never;
export declare const valid_number: <N extends number>(x?: IsValidNumber<N>) => number;
export {};
