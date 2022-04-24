export const tupleErr = <T>(v: T) => [v ?? new Error(), null];
export const tupleVal = <T>(v: T) => [null, v];
