# [fp-async](https://github.com/PassionPI/fp-async#readme)

## 宗旨

打造一个简单、函数式、易错误处理的异步函数库

## 原则

1. 高阶函数,或者有返回值的非高阶函数,返回结果均为`Promise<[Error | null, Awaited<ReturnType<typeof fn>>]>`
2. 无返回值函数,则返回`void`(视情况返回`Promise<void>`)
3. 单一性原则,即一个函数只做一件事
   - 减少泛型使用「泛型应使用在较为通用的集合中」

## [Doc](https://github.com/PassionPI/fp-async#readme)

### either

```typescript
interface Either {
  <A extends unknown[], R>(fn: (...args: A) => R): <X = R>(
    ...args: A
  ) => Promise<[Error | null, Awaited<X>]>;
}
```

#### description

对传入的异步函数进行自动错误捕获

产生错误 => `Promise<[Error, null]>`

正常运行 => `Promise<[null, Awaited<ReturnType<typeof fn>>]>`

默认返回签名 => `Promise<[Error | null, Awaited<ReturnType<typeof fn>>]>`

#### example

```typescript
import { either } from "fp-async";

const isErr = either(() => Promise.reject("err"));
const isOk = either(() => Promise.resolve({ data: "ok" }));

var [err, data] = await isErr();
// err => Error('err'); data => never

var [err, data] = await isOk();
// err => null; data => { data: "ok" }
```

### pipeline

```typescript
declare type PipeChain<T> = T extends Pipeline<infer U> | Promise<infer U>
  ? PipeChain<JarChainJoin<U>>
  : Pipeline<T>;
declare type PipeChainJoin<T> = T extends Pipeline<infer U> | Promise<infer U>
  ? PipeChainJoin<JarChainJoin<U>>
  : Awaited<T>;
declare class Pipeline<X> extends Promise<Jar<X>> {
  pipe<R>(f: (x: X) => R): PipeChain<R>;
  ap(
    x: PipeChainJoin<X> extends (...args: any[]) => any
      ? Parameters<PipeChainJoin<X>>[0]
      : never
  ): PipeChainJoin<X> extends (...args: any[]) => any
    ? PipeChain<ReturnType<PipeChainJoin<X>>>
    : never;
}
declare const pipeline: <X>(x?: X | undefined) => PipeChain<X>;
```

#### description

通过 pipe 的连缀调用形式
组合多个异步方法
并且自动错误捕获
当产生错误的时候
自动停止后续函数调用

产生错误 => `Promise<[Error, null]>`

正常运行 => `Promise<[null, Awaited<ReturnType<typeof fn>>]>`

默认返回签名 => `Promise<[Error | null, Awaited<ReturnType<typeof fn>>]>`

注: 可以与`either`一同使用

#### example

```typescript
import { pipeline, either } from "fp-async";

const isErr = either(() => Promise.reject("err"));
const idNumber = either((x: number) => Promise.resolve(x));

var [err, data] = await pipeline(1)
  .pipe(idNumber)
  .pipe((x) => x + 1);
// err => null; data => 2

var [err, data] = await pipeline()
  .pipe(isErr)
  .pipe(() => console.log("is call?")); // 此行代码不执行
// err => Error('err'); data => null

var [err, data] = await pipeline()
  .pipe(() => Promise.reject("err"))
  .pipe(() => console.log("is call?")); // 此行代码不执行
// err => Error('err'); data => null

var [err, data] = await pipeline(1)
  .pipe((x) => x + 1)
  .pipe((x) => ({ x }));
// err => null; data => { x: 2 }
```

### pended

```typescript
export declare const pended: <T = unknown, E = unknown>() => {
  resolve: (data?: T | PromiseLike<T> | undefined) => void;
  reject: (msg?: E | undefined) => void;
  pending: Promise<T>;
};
```

#### description

通过 pipe 的连缀调用形式
组合多个异步方法
并且自动错误捕获
当产生错误的时候
自动停止后续函数调用

产生错误 => `Promise<[Error, null]>`

正常运行 => `Promise<[null, Awaited<ReturnType<typeof fn>>]>`

默认返回签名 => `Promise<[Error | null, Awaited<ReturnType<typeof fn>>]>`

注: 可以与`either`一同使用

#### example

```typescript
import { pipeline, either } from "fp-async";

const isErr = either(() => Promise.reject("err"));
const idNumber = either((x: number) => Promise.resolve(x));

var [err, data] = await pipeline(1)
  .pipe(idNumber)
  .pipe((x) => x + 1);
// err => null; data => 2

var [err, data] = await pipeline()
  .pipe(isErr)
  .pipe(() => console.log("is call?")); // 此行代码不执行
// err => Error('err'); data => null

var [err, data] = await pipeline()
  .pipe(() => Promise.reject("err"))
  .pipe(() => console.log("is call?")); // 此行代码不执行
// err => Error('err'); data => null

var [err, data] = await pipeline(1)
  .pipe((x) => x + 1)
  .pipe((x) => ({ x }));
// err => null; data => { x: 2 }
```
