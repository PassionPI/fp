type Out<T> = Awaited<T>;
type Init<T> = Out<T> | Result<T>;
type Chain<T> = T;
type Result<T> = Promise<Awaited<T>>;
type ResultFn<T, R> = T extends undefined
  ? () => Result<R>
  : (init: Init<T>) => Result<R>;
export interface Flow {
  <T1, R>(fn1: (t1: Out<T1>) => Chain<R>): ResultFn<T1, R>;
  <T1, T2, R>(
    fn1: (t1: Out<T1>) => Chain<T2>,
    fn2: (t2: Out<T2>) => Chain<R>
  ): ResultFn<T1, R>;
  <T1, T2, T3, R>(
    fn1: (t1: Out<T1>) => Chain<T2>,
    fn2: (t2: Out<T2>) => Chain<T3>,
    fn3: (t3: Out<T3>) => Chain<R>
  ): ResultFn<T1, R>;
  <T1, T2, T3, T4, R>(
    fn1: (t1: Out<T1>) => Chain<T2>,
    fn2: (t2: Out<T2>) => Chain<T3>,
    fn3: (t3: Out<T3>) => Chain<T4>,
    fn4: (t4: Out<T4>) => Chain<R>
  ): ResultFn<T1, R>;
  <T1, T2, T3, T4, T5, R>(
    fn1: (t1: Out<T1>) => Chain<T2>,
    fn2: (t2: Out<T2>) => Chain<T3>,
    fn3: (t3: Out<T3>) => Chain<T4>,
    fn4: (t4: Out<T4>) => Chain<T5>,
    fn5: (t5: Out<T5>) => Chain<R>
  ): ResultFn<T1, R>;
  <T1, T2, T3, T4, T5, T6, R>(
    fn1: (t1: Out<T1>) => Chain<T2>,
    fn2: (t2: Out<T2>) => Chain<T3>,
    fn3: (t3: Out<T3>) => Chain<T4>,
    fn4: (t4: Out<T4>) => Chain<T5>,
    fn5: (t5: Out<T5>) => Chain<T6>,
    fn6: (t5: Out<T6>) => Chain<R>
  ): ResultFn<T1, R>;
  <T1, T2, T3, T4, T5, T6, T7, R>(
    fn1: (t1: Out<T1>) => Chain<T2>,
    fn2: (t2: Out<T2>) => Chain<T3>,
    fn3: (t3: Out<T3>) => Chain<T4>,
    fn4: (t4: Out<T4>) => Chain<T5>,
    fn5: (t5: Out<T5>) => Chain<T6>,
    fn6: (t5: Out<T6>) => Chain<T7>,
    fn7: (t5: Out<T7>) => Chain<R>
  ): ResultFn<T1, R>;
  <T1, T2, T3, T4, T5, T6, T7, T8, R>(
    fn1: (t1: Out<T1>) => Chain<T2>,
    fn2: (t2: Out<T2>) => Chain<T3>,
    fn3: (t3: Out<T3>) => Chain<T4>,
    fn4: (t4: Out<T4>) => Chain<T5>,
    fn5: (t5: Out<T5>) => Chain<T6>,
    fn6: (t5: Out<T6>) => Chain<T7>,
    fn7: (t5: Out<T7>) => Chain<T8>,
    fn8: (t5: Out<T8>) => Chain<R>
  ): ResultFn<T1, R>;
  <T1, T2, T3, T4, T5, T6, T7, T8, T9, R>(
    fn1: (t1: Out<T1>) => Chain<T2>,
    fn2: (t2: Out<T2>) => Chain<T3>,
    fn3: (t3: Out<T3>) => Chain<T4>,
    fn4: (t4: Out<T4>) => Chain<T5>,
    fn5: (t5: Out<T5>) => Chain<T6>,
    fn6: (t5: Out<T6>) => Chain<T7>,
    fn7: (t5: Out<T7>) => Chain<T8>,
    fn8: (t5: Out<T8>) => Chain<T9>,
    fn9: (t5: Out<T9>) => Chain<R>
  ): ResultFn<T1, R>;
  <T1, T2, T3, T4, T5, T6, T7, T8, T9, T10, R>(
    fn1: (t1: Out<T1>) => Chain<T2>,
    fn2: (t2: Out<T2>) => Chain<T3>,
    fn3: (t3: Out<T3>) => Chain<T4>,
    fn4: (t4: Out<T4>) => Chain<T5>,
    fn5: (t5: Out<T5>) => Chain<T6>,
    fn6: (t6: Out<T6>) => Chain<T7>,
    fn7: (t7: Out<T7>) => Chain<T8>,
    fn8: (t8: Out<T8>) => Chain<T9>,
    fn9: (t9: Out<T9>) => Chain<T10>,
    fn10: (t10: Out<T10>) => Chain<R>
  ): ResultFn<T1, R>;
  <T1, T2, T3, T4, T5, T6, T7, T8, T9, T10, T11, R>(
    fn1: (t1: Out<T1>) => Chain<T2>,
    fn2: (t2: Out<T2>) => Chain<T3>,
    fn3: (t3: Out<T3>) => Chain<T4>,
    fn4: (t4: Out<T4>) => Chain<T5>,
    fn5: (t5: Out<T5>) => Chain<T6>,
    fn6: (t6: Out<T6>) => Chain<T7>,
    fn7: (t7: Out<T7>) => Chain<T8>,
    fn8: (t8: Out<T8>) => Chain<T9>,
    fn9: (t9: Out<T9>) => Chain<T10>,
    fn10: (t10: Out<T10>) => Chain<T11>,
    fn11: (t11: Out<T11>) => Chain<R>
  ): ResultFn<T1, R>;
  <T1, T2, T3, T4, T5, T6, T7, T8, T9, T10, T11, T12, R>(
    fn1: (t1: Out<T1>) => Chain<T2>,
    fn2: (t2: Out<T2>) => Chain<T3>,
    fn3: (t3: Out<T3>) => Chain<T4>,
    fn4: (t4: Out<T4>) => Chain<T5>,
    fn5: (t5: Out<T5>) => Chain<T6>,
    fn6: (t6: Out<T6>) => Chain<T7>,
    fn7: (t7: Out<T7>) => Chain<T8>,
    fn8: (t8: Out<T8>) => Chain<T9>,
    fn9: (t9: Out<T9>) => Chain<T10>,
    fn10: (t10: Out<T10>) => Chain<T11>,
    fn11: (t11: Out<T11>) => Chain<T12>,
    fn12: (t12: Out<T12>) => Chain<R>
  ): ResultFn<T1, R>;
  <T1, T2, T3, T4, T5, T6, T7, T8, T9, T10, T11, T12, T13, R>(
    fn1: (t1: Out<T1>) => Chain<T2>,
    fn2: (t2: Out<T2>) => Chain<T3>,
    fn3: (t3: Out<T3>) => Chain<T4>,
    fn4: (t4: Out<T4>) => Chain<T5>,
    fn5: (t5: Out<T5>) => Chain<T6>,
    fn6: (t6: Out<T6>) => Chain<T7>,
    fn7: (t7: Out<T7>) => Chain<T8>,
    fn8: (t8: Out<T8>) => Chain<T9>,
    fn9: (t9: Out<T9>) => Chain<T10>,
    fn10: (t10: Out<T10>) => Chain<T11>,
    fn11: (t11: Out<T11>) => Chain<T12>,
    fn12: (t12: Out<T12>) => Chain<T13>,
    fn13: (t13: Out<T13>) => Chain<R>
  ): ResultFn<T1, R>;
  <T1, T2, T3, T4, T5, T6, T7, T8, T9, T10, T11, T12, T13, T14, R>(
    fn1: (t1: Out<T1>) => Chain<T2>,
    fn2: (t2: Out<T2>) => Chain<T3>,
    fn3: (t3: Out<T3>) => Chain<T4>,
    fn4: (t4: Out<T4>) => Chain<T5>,
    fn5: (t5: Out<T5>) => Chain<T6>,
    fn6: (t6: Out<T6>) => Chain<T7>,
    fn7: (t7: Out<T7>) => Chain<T8>,
    fn8: (t8: Out<T8>) => Chain<T9>,
    fn9: (t9: Out<T9>) => Chain<T10>,
    fn10: (t10: Out<T10>) => Chain<T11>,
    fn11: (t11: Out<T11>) => Chain<T12>,
    fn12: (t12: Out<T12>) => Chain<T13>,
    fn13: (t13: Out<T13>) => Chain<T14>,
    fn14: (t14: Out<T14>) => Chain<R>
  ): ResultFn<T1, R>;
  <T1, T2, T3, T4, T5, T6, T7, T8, T9, T10, T11, T12, T13, T14, T15, R>(
    fn1: (t1: Out<T1>) => Chain<T2>,
    fn2: (t2: Out<T2>) => Chain<T3>,
    fn3: (t3: Out<T3>) => Chain<T4>,
    fn4: (t4: Out<T4>) => Chain<T5>,
    fn5: (t5: Out<T5>) => Chain<T6>,
    fn6: (t6: Out<T6>) => Chain<T7>,
    fn7: (t7: Out<T7>) => Chain<T8>,
    fn8: (t8: Out<T8>) => Chain<T9>,
    fn9: (t9: Out<T9>) => Chain<T10>,
    fn10: (t10: Out<T10>) => Chain<T11>,
    fn11: (t11: Out<T11>) => Chain<T12>,
    fn12: (t12: Out<T12>) => Chain<T13>,
    fn13: (t13: Out<T13>) => Chain<T14>,
    fn14: (t14: Out<T14>) => Chain<T15>,
    fn15: (t15: Out<T15>) => Chain<R>
  ): ResultFn<T1, R>;
  <T1, T2, T3, T4, T5, T6, T7, T8, T9, T10, T11, T12, T13, T14, T15, T16, R>(
    fn1: (t1: Out<T1>) => Chain<T2>,
    fn2: (t2: Out<T2>) => Chain<T3>,
    fn3: (t3: Out<T3>) => Chain<T4>,
    fn4: (t4: Out<T4>) => Chain<T5>,
    fn5: (t5: Out<T5>) => Chain<T6>,
    fn6: (t6: Out<T6>) => Chain<T7>,
    fn7: (t7: Out<T7>) => Chain<T8>,
    fn8: (t8: Out<T8>) => Chain<T9>,
    fn9: (t9: Out<T9>) => Chain<T10>,
    fn10: (t10: Out<T10>) => Chain<T11>,
    fn11: (t11: Out<T11>) => Chain<T12>,
    fn12: (t12: Out<T12>) => Chain<T13>,
    fn13: (t13: Out<T13>) => Chain<T14>,
    fn14: (t14: Out<T14>) => Chain<T15>,
    fn15: (t15: Out<T15>) => Chain<T16>,
    fn16: (t16: Out<T16>) => Chain<R>
  ): ResultFn<T1, R>;
}

export const flow: Flow =
  (...fns: Function[]) =>
  async (acc?: unknown) => {
    for (const fn of fns) {
      acc = fn(await acc);
    }
    return acc;
  };
