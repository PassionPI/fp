import { either } from "./either";

interface Mid<T> {
  (ctx: T, next: () => Promise<void>): Promise<void>;
}

const _resolve = () => Promise.resolve();

export const shuttle = <Ctx>(
  fns: Array<Mid<Ctx>>,
  end: () => Promise<void> = _resolve
) =>
  either((ctx: Ctx) => {
    const dispatch = async (i: number): Promise<void> => {
      let done = false;
      const fn = fns[i] ?? end;
      const pm = await fn(ctx, () => {
        if (done) return _resolve();
        done = true;
        return dispatch(i + 1);
      });
      return pm;
    };
    return dispatch(0);
  });
