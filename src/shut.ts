import { either } from "./either";

type Mid<T> = (ctx: T, next: () => Promise<void>) => Promise<void>;

const _resolve = () => Promise.resolve();

export const shut = <Ctx>(
  fns: Array<Mid<Ctx>>,
  end: () => Promise<void> = _resolve
) =>
  either((ctx: Ctx) => {
    const dispatch = async (i: number): Promise<void> => {
      let done = false;
      return (fns[i] ?? end)(ctx, () => {
        if (done) return _resolve();
        done = true;
        return dispatch(i + 1);
      });
    };
    return dispatch(0);
  });
