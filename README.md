# fp-async

## 宗旨

打造一个简单、函数式、易错误处理的异步函数库

## 原则

1. 高阶函数,或者有返回值的非高阶函数,返回结果均为`Promise<[Error | null, Awaited<ReturnType<typeof fn>>]>`
2. 无返回值函数,则返回`void`(视情况返回`Promise<void>`)
3. 单一性原则,即一个函数只做一件事

## API

### either

```typescript
interface Either {
  <A extends unknown[], R>(fn: (...args: A) => R): <X = R>(
    ...args: A
  ) => Promise<[Error | null, Awaited<X>]>;
}
```

It wrap `async` function that returns `Promise<[Error | null, Awaited<ReturnType<typeof fn>>]>`.

- description

对传入的异步函数进行自动错误捕获

产生错误 => `[Error, null]`

正常运行 => `[null, Awaited<ReturnType<typeof fn>>]`

- either example

```typescript
import { either } from "fp-async";

const isErr = either(() => Promise.reject("err"));
const isOk = either(() => Promise.resolve({ data: "ok" }));
const isX = either((x) => Promise.resolve(x));

var [err, data] = await isErr();
// err => Error('err'); data => never

var [err, data] = await isOk();
// err => null; data => { data: "ok" }

var [err, data] = await isX<{ message: string }>({ message: "ok" });
// err => null; data => { message: "ok" }
```
