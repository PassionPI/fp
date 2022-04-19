interface Either {
  <A extends unknown[], R>(fn: (...args: A) => R): <E = unknown>(
    ...args: A
  ) => Promise<[E, R extends Promise<infer U> ? U : R]>;
}

//* promise结果的二元错误处理。返回 -> [错误, 结果]
export const either: Either = (fn) =>
  new Proxy(fn, {
    apply: (...args) =>
      new Promise((resolve) => resolve(Reflect.apply(...args))).then(
        (val) => [null, val] as const,
        (err) => [err, null] as const
      ),
  }) as any;
