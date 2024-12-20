export interface Pipe {
  <R, T1 = void>(fn1: (t1: T1) => R): (init: T1) => R;
  <R, T1 = void, T2 = void>(fn1: (t1: T1) => T2, fn2: (t2: T2) => R): (
    init: T1
  ) => R;
  <R, T1 = void, T2 = void, T3 = void>(
    fn1: (t1: T1) => T2,
    fn2: (t2: T2) => T3,
    fn3: (t3: T3) => R
  ): (init: T1) => R;
  <R, T1 = void, T2 = void, T3 = void, T4 = void>(
    fn1: (t1: T1) => T2,
    fn2: (t2: T2) => T3,
    fn3: (t3: T3) => T4,
    fn4: (t4: T4) => R
  ): (init: T1) => R;
  <R, T1 = void, T2 = void, T3 = void, T4 = void, T5 = void>(
    fn1: (t1: T1) => T2,
    fn2: (t2: T2) => T3,
    fn3: (t3: T3) => T4,
    fn4: (t4: T4) => T5,
    fn5: (t5: T5) => R
  ): (init: T1) => R;
  <R, T1 = void, T2 = void, T3 = void, T4 = void, T5 = void, T6 = void>(
    fn1: (t1: T1) => T2,
    fn2: (t2: T2) => T3,
    fn3: (t3: T3) => T4,
    fn4: (t4: T4) => T5,
    fn5: (t5: T5) => T6,
    fn6: (t6: T6) => R
  ): (init: T1) => R;
  <
    R,
    T1 = void,
    T2 = void,
    T3 = void,
    T4 = void,
    T5 = void,
    T6 = void,
    T7 = void
  >(
    fn1: (t1: T1) => T2,
    fn2: (t2: T2) => T3,
    fn3: (t3: T3) => T4,
    fn4: (t4: T4) => T5,
    fn5: (t5: T5) => T6,
    fn6: (t6: T6) => T7,
    fn7: (t7: T7) => R
  ): (init: T1) => R;
  <
    R,
    T1 = void,
    T2 = void,
    T3 = void,
    T4 = void,
    T5 = void,
    T6 = void,
    T7 = void,
    T8 = void
  >(
    fn1: (t1: T1) => T2,
    fn2: (t2: T2) => T3,
    fn3: (t3: T3) => T4,
    fn4: (t4: T4) => T5,
    fn5: (t5: T5) => T6,
    fn6: (t6: T6) => T7,
    fn7: (t7: T7) => T8,
    fn8: (t7: T8) => R
  ): (init: T1) => R;
  <
    R,
    T1 = void,
    T2 = void,
    T3 = void,
    T4 = void,
    T5 = void,
    T6 = void,
    T7 = void,
    T8 = void,
    T9 = void
  >(
    fn1: (t1: T1) => T2,
    fn2: (t2: T2) => T3,
    fn3: (t3: T3) => T4,
    fn4: (t4: T4) => T5,
    fn5: (t5: T5) => T6,
    fn6: (t6: T6) => T7,
    fn7: (t7: T7) => T8,
    fn8: (t7: T8) => T9,
    fn9: (t7: T9) => R
  ): (init: T1) => R;
  <
    R,
    T1 = void,
    T2 = void,
    T3 = void,
    T4 = void,
    T5 = void,
    T6 = void,
    T7 = void,
    T8 = void,
    T9 = void,
    T10 = void
  >(
    fn1: (t1: T1) => T2,
    fn2: (t2: T2) => T3,
    fn3: (t3: T3) => T4,
    fn4: (t4: T4) => T5,
    fn5: (t5: T5) => T6,
    fn6: (t6: T6) => T7,
    fn7: (t7: T7) => T8,
    fn8: (t8: T8) => T9,
    fn9: (t9: T9) => T10,
    fn10: (t10: T10) => R
  ): (init: T1) => R;
  <
    R,
    T1 = void,
    T2 = void,
    T3 = void,
    T4 = void,
    T5 = void,
    T6 = void,
    T7 = void,
    T8 = void,
    T9 = void,
    T10 = void,
    T11 = void
  >(
    fn1: (t1: T1) => T2,
    fn2: (t2: T2) => T3,
    fn3: (t3: T3) => T4,
    fn4: (t4: T4) => T5,
    fn5: (t5: T5) => T6,
    fn6: (t6: T6) => T7,
    fn7: (t7: T7) => T8,
    fn8: (t8: T8) => T9,
    fn9: (t9: T9) => T10,
    fn10: (t10: T10) => T11,
    fn11: (t11: T11) => R
  ): (init: T1) => R;
  <
    R,
    T1 = void,
    T2 = void,
    T3 = void,
    T4 = void,
    T5 = void,
    T6 = void,
    T7 = void,
    T8 = void,
    T9 = void,
    T10 = void,
    T11 = void,
    T12 = void
  >(
    fn1: (t1: T1) => T2,
    fn2: (t2: T2) => T3,
    fn3: (t3: T3) => T4,
    fn4: (t4: T4) => T5,
    fn5: (t5: T5) => T6,
    fn6: (t6: T6) => T7,
    fn7: (t7: T7) => T8,
    fn8: (t8: T8) => T9,
    fn9: (t9: T9) => T10,
    fn10: (t10: T10) => T11,
    fn11: (t11: T11) => T12,
    fn12: (t12: T12) => R
  ): (init: T1) => R;
  <
    R,
    T1 = void,
    T2 = void,
    T3 = void,
    T4 = void,
    T5 = void,
    T6 = void,
    T7 = void,
    T8 = void,
    T9 = void,
    T10 = void,
    T11 = void,
    T12 = void,
    T13 = void
  >(
    fn1: (t1: T1) => T2,
    fn2: (t2: T2) => T3,
    fn3: (t3: T3) => T4,
    fn4: (t4: T4) => T5,
    fn5: (t5: T5) => T6,
    fn6: (t6: T6) => T7,
    fn7: (t7: T7) => T8,
    fn8: (t8: T8) => T9,
    fn9: (t9: T9) => T10,
    fn10: (t10: T10) => T11,
    fn11: (t11: T11) => T12,
    fn12: (t12: T12) => T13,
    fn13: (t13: T13) => R
  ): (init: T1) => R;
  <
    R,
    T1 = void,
    T2 = void,
    T3 = void,
    T4 = void,
    T5 = void,
    T6 = void,
    T7 = void,
    T8 = void,
    T9 = void,
    T10 = void,
    T11 = void,
    T12 = void,
    T13 = void,
    T14 = void
  >(
    fn1: (t1: T1) => T2,
    fn2: (t2: T2) => T3,
    fn3: (t3: T3) => T4,
    fn4: (t4: T4) => T5,
    fn5: (t5: T5) => T6,
    fn6: (t6: T6) => T7,
    fn7: (t7: T7) => T8,
    fn8: (t8: T8) => T9,
    fn9: (t9: T9) => T10,
    fn10: (t10: T10) => T11,
    fn11: (t11: T11) => T12,
    fn12: (t12: T12) => T13,
    fn13: (t13: T13) => T14,
    fn14: (t14: T14) => R
  ): (init: T1) => R;
  <
    R,
    T1 = void,
    T2 = void,
    T3 = void,
    T4 = void,
    T5 = void,
    T6 = void,
    T7 = void,
    T8 = void,
    T9 = void,
    T10 = void,
    T11 = void,
    T12 = void,
    T13 = void,
    T14 = void,
    T15 = void
  >(
    fn1: (t1: T1) => T2,
    fn2: (t2: T2) => T3,
    fn3: (t3: T3) => T4,
    fn4: (t4: T4) => T5,
    fn5: (t5: T5) => T6,
    fn6: (t6: T6) => T7,
    fn7: (t7: T7) => T8,
    fn8: (t8: T8) => T9,
    fn9: (t9: T9) => T10,
    fn10: (t10: T10) => T11,
    fn11: (t11: T11) => T12,
    fn12: (t12: T12) => T13,
    fn13: (t13: T13) => T14,
    fn14: (t14: T14) => T15,
    fn15: (t15: T15) => R
  ): (init: T1) => R;
  <
    R,
    T1 = void,
    T2 = void,
    T3 = void,
    T4 = void,
    T5 = void,
    T6 = void,
    T7 = void,
    T8 = void,
    T9 = void,
    T10 = void,
    T11 = void,
    T12 = void,
    T13 = void,
    T14 = void,
    T15 = void,
    T16 = void
  >(
    fn1: (t1: T1) => T2,
    fn2: (t2: T2) => T3,
    fn3: (t3: T3) => T4,
    fn4: (t4: T4) => T5,
    fn5: (t5: T5) => T6,
    fn6: (t6: T6) => T7,
    fn7: (t7: T7) => T8,
    fn8: (t8: T8) => T9,
    fn9: (t9: T9) => T10,
    fn10: (t10: T10) => T11,
    fn11: (t11: T11) => T12,
    fn12: (t12: T12) => T13,
    fn13: (t13: T13) => T14,
    fn14: (t14: T14) => T15,
    fn15: (t15: T15) => T16,
    fn16: (t16: T16) => R
  ): (init: T1) => R;
}

type FlowFn<T, R> = (
  init: Awaited<T> | Promise<Awaited<T>>
) => Promise<Awaited<R>>;

export interface Flow {
  <R, T1 = void>(fn1: (t1: Awaited<T1>) => R): FlowFn<T1, R>;
  <R, T1 = void, T2 = void>(
    fn1: (t1: Awaited<T1>) => T2,
    fn2: (t2: Awaited<T2>) => R
  ): FlowFn<T1, R>;
  <R, T1 = void, T2 = void, T3 = void>(
    fn1: (t1: Awaited<T1>) => T2,
    fn2: (t2: Awaited<T2>) => T3,
    fn3: (t3: Awaited<T3>) => R
  ): FlowFn<T1, R>;
  <R, T1 = void, T2 = void, T3 = void, T4 = void>(
    fn1: (t1: Awaited<T1>) => T2,
    fn2: (t2: Awaited<T2>) => T3,
    fn3: (t3: Awaited<T3>) => T4,
    fn4: (t4: Awaited<T4>) => R
  ): FlowFn<T1, R>;
  <R, T1 = void, T2 = void, T3 = void, T4 = void, T5 = void>(
    fn1: (t1: Awaited<T1>) => T2,
    fn2: (t2: Awaited<T2>) => T3,
    fn3: (t3: Awaited<T3>) => T4,
    fn4: (t4: Awaited<T4>) => T5,
    fn5: (t5: Awaited<T5>) => R
  ): FlowFn<T1, R>;
  <R, T1 = void, T2 = void, T3 = void, T4 = void, T5 = void, T6 = void>(
    fn1: (t1: Awaited<T1>) => T2,
    fn2: (t2: Awaited<T2>) => T3,
    fn3: (t3: Awaited<T3>) => T4,
    fn4: (t4: Awaited<T4>) => T5,
    fn5: (t5: Awaited<T5>) => T6,
    fn6: (t5: Awaited<T6>) => R
  ): FlowFn<T1, R>;
  <
    R,
    T1 = void,
    T2 = void,
    T3 = void,
    T4 = void,
    T5 = void,
    T6 = void,
    T7 = void
  >(
    fn1: (t1: Awaited<T1>) => T2,
    fn2: (t2: Awaited<T2>) => T3,
    fn3: (t3: Awaited<T3>) => T4,
    fn4: (t4: Awaited<T4>) => T5,
    fn5: (t5: Awaited<T5>) => T6,
    fn6: (t5: Awaited<T6>) => T7,
    fn7: (t5: Awaited<T7>) => R
  ): FlowFn<T1, R>;
  <
    R,
    T1 = void,
    T2 = void,
    T3 = void,
    T4 = void,
    T5 = void,
    T6 = void,
    T7 = void,
    T8 = void
  >(
    fn1: (t1: Awaited<T1>) => T2,
    fn2: (t2: Awaited<T2>) => T3,
    fn3: (t3: Awaited<T3>) => T4,
    fn4: (t4: Awaited<T4>) => T5,
    fn5: (t5: Awaited<T5>) => T6,
    fn6: (t5: Awaited<T6>) => T7,
    fn7: (t5: Awaited<T7>) => T8,
    fn8: (t5: Awaited<T8>) => R
  ): FlowFn<T1, R>;
  <
    R,
    T1 = void,
    T2 = void,
    T3 = void,
    T4 = void,
    T5 = void,
    T6 = void,
    T7 = void,
    T8 = void,
    T9 = void
  >(
    fn1: (t1: Awaited<T1>) => T2,
    fn2: (t2: Awaited<T2>) => T3,
    fn3: (t3: Awaited<T3>) => T4,
    fn4: (t4: Awaited<T4>) => T5,
    fn5: (t5: Awaited<T5>) => T6,
    fn6: (t5: Awaited<T6>) => T7,
    fn7: (t5: Awaited<T7>) => T8,
    fn8: (t5: Awaited<T8>) => T9,
    fn9: (t5: Awaited<T9>) => R
  ): FlowFn<T1, R>;
  <
    R,
    T1 = void,
    T2 = void,
    T3 = void,
    T4 = void,
    T5 = void,
    T6 = void,
    T7 = void,
    T8 = void,
    T9 = void,
    T10 = void
  >(
    fn1: (t1: Awaited<T1>) => T2,
    fn2: (t2: Awaited<T2>) => T3,
    fn3: (t3: Awaited<T3>) => T4,
    fn4: (t4: Awaited<T4>) => T5,
    fn5: (t5: Awaited<T5>) => T6,
    fn6: (t6: Awaited<T6>) => T7,
    fn7: (t7: Awaited<T7>) => T8,
    fn8: (t8: Awaited<T8>) => T9,
    fn9: (t9: Awaited<T9>) => T10,
    fn10: (t10: Awaited<T10>) => R
  ): FlowFn<T1, R>;
  <
    R,
    T1 = void,
    T2 = void,
    T3 = void,
    T4 = void,
    T5 = void,
    T6 = void,
    T7 = void,
    T8 = void,
    T9 = void,
    T10 = void,
    T11 = void
  >(
    fn1: (t1: Awaited<T1>) => T2,
    fn2: (t2: Awaited<T2>) => T3,
    fn3: (t3: Awaited<T3>) => T4,
    fn4: (t4: Awaited<T4>) => T5,
    fn5: (t5: Awaited<T5>) => T6,
    fn6: (t6: Awaited<T6>) => T7,
    fn7: (t7: Awaited<T7>) => T8,
    fn8: (t8: Awaited<T8>) => T9,
    fn9: (t9: Awaited<T9>) => T10,
    fn10: (t10: Awaited<T10>) => T11,
    fn11: (t11: Awaited<T11>) => R
  ): FlowFn<T1, R>;
  <
    R,
    T1 = void,
    T2 = void,
    T3 = void,
    T4 = void,
    T5 = void,
    T6 = void,
    T7 = void,
    T8 = void,
    T9 = void,
    T10 = void,
    T11 = void,
    T12 = void
  >(
    fn1: (t1: Awaited<T1>) => T2,
    fn2: (t2: Awaited<T2>) => T3,
    fn3: (t3: Awaited<T3>) => T4,
    fn4: (t4: Awaited<T4>) => T5,
    fn5: (t5: Awaited<T5>) => T6,
    fn6: (t6: Awaited<T6>) => T7,
    fn7: (t7: Awaited<T7>) => T8,
    fn8: (t8: Awaited<T8>) => T9,
    fn9: (t9: Awaited<T9>) => T10,
    fn10: (t10: Awaited<T10>) => T11,
    fn11: (t11: Awaited<T11>) => T12,
    fn12: (t12: Awaited<T12>) => R
  ): FlowFn<T1, R>;
  <
    R,
    T1 = void,
    T2 = void,
    T3 = void,
    T4 = void,
    T5 = void,
    T6 = void,
    T7 = void,
    T8 = void,
    T9 = void,
    T10 = void,
    T11 = void,
    T12 = void,
    T13 = void
  >(
    fn1: (t1: Awaited<T1>) => T2,
    fn2: (t2: Awaited<T2>) => T3,
    fn3: (t3: Awaited<T3>) => T4,
    fn4: (t4: Awaited<T4>) => T5,
    fn5: (t5: Awaited<T5>) => T6,
    fn6: (t6: Awaited<T6>) => T7,
    fn7: (t7: Awaited<T7>) => T8,
    fn8: (t8: Awaited<T8>) => T9,
    fn9: (t9: Awaited<T9>) => T10,
    fn10: (t10: Awaited<T10>) => T11,
    fn11: (t11: Awaited<T11>) => T12,
    fn12: (t12: Awaited<T12>) => T13,
    fn13: (t13: Awaited<T13>) => R
  ): FlowFn<T1, R>;
  <
    R,
    T1 = void,
    T2 = void,
    T3 = void,
    T4 = void,
    T5 = void,
    T6 = void,
    T7 = void,
    T8 = void,
    T9 = void,
    T10 = void,
    T11 = void,
    T12 = void,
    T13 = void,
    T14 = void
  >(
    fn1: (t1: Awaited<T1>) => T2,
    fn2: (t2: Awaited<T2>) => T3,
    fn3: (t3: Awaited<T3>) => T4,
    fn4: (t4: Awaited<T4>) => T5,
    fn5: (t5: Awaited<T5>) => T6,
    fn6: (t6: Awaited<T6>) => T7,
    fn7: (t7: Awaited<T7>) => T8,
    fn8: (t8: Awaited<T8>) => T9,
    fn9: (t9: Awaited<T9>) => T10,
    fn10: (t10: Awaited<T10>) => T11,
    fn11: (t11: Awaited<T11>) => T12,
    fn12: (t12: Awaited<T12>) => T13,
    fn13: (t13: Awaited<T13>) => T14,
    fn14: (t14: Awaited<T14>) => R
  ): FlowFn<T1, R>;
  <
    R,
    T1 = void,
    T2 = void,
    T3 = void,
    T4 = void,
    T5 = void,
    T6 = void,
    T7 = void,
    T8 = void,
    T9 = void,
    T10 = void,
    T11 = void,
    T12 = void,
    T13 = void,
    T14 = void,
    T15 = void
  >(
    fn1: (t1: Awaited<T1>) => T2,
    fn2: (t2: Awaited<T2>) => T3,
    fn3: (t3: Awaited<T3>) => T4,
    fn4: (t4: Awaited<T4>) => T5,
    fn5: (t5: Awaited<T5>) => T6,
    fn6: (t6: Awaited<T6>) => T7,
    fn7: (t7: Awaited<T7>) => T8,
    fn8: (t8: Awaited<T8>) => T9,
    fn9: (t9: Awaited<T9>) => T10,
    fn10: (t10: Awaited<T10>) => T11,
    fn11: (t11: Awaited<T11>) => T12,
    fn12: (t12: Awaited<T12>) => T13,
    fn13: (t13: Awaited<T13>) => T14,
    fn14: (t14: Awaited<T14>) => T15,
    fn15: (t15: Awaited<T15>) => R
  ): FlowFn<T1, R>;
  <
    R,
    T1 = void,
    T2 = void,
    T3 = void,
    T4 = void,
    T5 = void,
    T6 = void,
    T7 = void,
    T8 = void,
    T9 = void,
    T10 = void,
    T11 = void,
    T12 = void,
    T13 = void,
    T14 = void,
    T15 = void,
    T16 = void
  >(
    fn1: (t1: Awaited<T1>) => T2,
    fn2: (t2: Awaited<T2>) => T3,
    fn3: (t3: Awaited<T3>) => T4,
    fn4: (t4: Awaited<T4>) => T5,
    fn5: (t5: Awaited<T5>) => T6,
    fn6: (t6: Awaited<T6>) => T7,
    fn7: (t7: Awaited<T7>) => T8,
    fn8: (t8: Awaited<T8>) => T9,
    fn9: (t9: Awaited<T9>) => T10,
    fn10: (t10: Awaited<T10>) => T11,
    fn11: (t11: Awaited<T11>) => T12,
    fn12: (t12: Awaited<T12>) => T13,
    fn13: (t13: Awaited<T13>) => T14,
    fn14: (t14: Awaited<T14>) => T15,
    fn15: (t15: Awaited<T15>) => T16,
    fn16: (t16: Awaited<T16>) => R
  ): FlowFn<T1, R>;
}

export const pipe: Pipe =
  (...fns: Function[]) =>
  (acc?: unknown) => {
    for (const fn of fns) {
      acc = fn(acc);
    }
    return acc;
  };

export const flow: Flow =
  (...fns: Function[]) =>
  async (acc?: unknown) => {
    for (const fn of fns) {
      acc = fn(await acc);
    }
    return acc;
  };
