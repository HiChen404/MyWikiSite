---
description: TypeScript Challenges 笔记
keywords:
  - typescript
image: https://picgo-1259617372.cos.ap-beijing.myqcloud.com/Picgo/2022/01/19-11-28-23-404Lab.jpeg
tags: [编程, typescript]
---

<img className="Badges" src="https://picgo-1259617372.cos.ap-beijing.myqcloud.com/logo_chen_%E7%B4%AB%E8%89%B2.svg"/>
<img className="Badges" src="https://api.netlify.com/api/v1/badges/62b2ea8d-7e62-49d1-bb5a-b507b01377af/deploy-status"/>

## 189. Easy Await

If we have a type which is wrapped type like Promise. How we can get a type which is inside the wrapped type? For example if we have `Promise<ExampleType>` how to get ExampleType?

```typescript
type X = Promise<string>
type Y = Promise<{ field: number }>
type Z = Promise<Promise<string | number>>

type cases = [
  Expect<Equal<MyAwaited<X>, string>>,
  Expect<Equal<MyAwaited<Y>, { field: number }>>,
  Expect<Equal<MyAwaited<Z>, string | number>>,
]

// @ts-expect-error
type error = MyAwaited<number>
```

直白的说，需要实现 `MyAwaited<Promise<string>>` 的结果为 string。

`MyAwaited<Promise<ExampleType>>` = `ExampleType`

**解题思路：**

1. 判断 T 是否是 Promise 类型，如果是 Promise 类型，返回 Promise 类型推断 X ,如果不是 Promise 类型，则返回 T

```typescript
type MyAwaited<T> = T extends Promise<infer X> ? X : T
```

这样只能通过 X，Y 的测试用例（题目描述中的测试用例）, **无法处理嵌套** Promise 和 错误情况（T 不是 Promise 需抛出错误）

2. 利用递归的思路,如果 T 是 Promise 类型，调用自身。

```typescript
type MyAwaited<T> = T extends Promise<infer X> ? MyAwaited<T> : T
```

这样可以通过 X,Y,Z 的测试用例，虽然判断了 T 是否是 Promise，但无法处理 T 不是 Promise 的情况。

3. 可以通过限定 T 的类型

```typescript
type MyAwaited<T extends Promise<unknown>> = T extends Promise<infer X> ? MyAwaited<X> : T //报错
```

这样实际上会报错，因为已经限定了 T 为 Promise, 但调用自身时，X 有可能不是 Promise

4. 所以需要对 X 再进行判断

```typescript
type MyAwaited<T extends Promise<unknown>> = T extends Promise<infer X>
  ? X extends Promise<unknown>
    ? MyAwaited<X>
    : X
  : never
```

由于最外层的三元运算的否定逻辑并不会执行，所以可以将其改为 never（或者任何类型都可以）。

这样可以通过全部测试。

## 014. Easy First

Implement a generic `First<T>` that takes an Array `T` and returns it's first element's type.

For example

```typescript
type arr1 = ['a', 'b', 'c']
type arr2 = [3, 2, 1]

type head1 = First<arr1> // expected to be 'a'
type head2 = First<arr2> // expected to be 3
type head2 = First<arr2> // expected to be never
```

1. 直接获取第 1 个元素。

   不过如果 T 是空数组，那么会返回 undefined, 所以这种方法并不满足题目要求。

   ```typescript
   type First<T extends any[]> = T[0]
   ```

2. 判断 T 是否为空数组

   ```typescript
   type First<T extends any[]> = T extends {} : never : T[0]
   ```

3. 判断数组长度是否为 0

   ```typescript
   type First<T extends any[]> = T['length'] extends 0 ? never : T[0]
   ```

4. infer

   ```typescript
   type First<T extends any[]> = T entends [infer First,...infer Rest] ? First : never
   ```

## 015. Last of Array

Implement a generic `Last<T>` that takes an Array `T` and returns its last element.

For example

```typescript
type arr1 = ['a', 'b', 'c']
type arr2 = [3, 2, 1]

type tail1 = Last<arr1> // expected to be 'c'
type tail2 = Last<arr2> // expected to be 1
```

与第 14 题类似，可以使用 infer。

```typescript
type Last<T extends any[]> = T extends [...infer Rest, infer Last] ? Last : never
```

## 043. Easy Exclude

Implement the built-in Exclude<T, U>

Exclude from T those types that are assignable to U

```typescript
type cases = [
  Expect<Equal<MyExclude<'a' | 'b' | 'c', 'a'>, Exclude<'a' | 'b' | 'c', 'a'>>>,
  Expect<Equal<MyExclude<'a' | 'b' | 'c', 'a' | 'b'>, Exclude<'a' | 'b' | 'c', 'a' | 'b'>>>,
  Expect<Equal<MyExclude<string | number | (() => void), Function>, Exclude<string | number | (() => void), Function>>>,
]
```

实现一个 Exclude，从 T 中排除掉可以分配给 U 的类型，也就是说，

如果 T 中出现 U 中的类型，则将 T 中的这个类型过滤掉。

如果 U 中的类型没有在 T 中出现，则忽略。

**例如：**

```typescript
let a: Exclude<string | number | object, string | Function> // let a = number|object
let b: MyExclude<string | number | object, string | Function> // let b = number|object
```

**答案：**

```typescript
type MyExclude<T, U> = T extends U ? never : T
```

TS 官方实现了 `Exclue<UnionType,ExcludedMembers>` Utility Types:

https://www.typescriptlang.org/docs/handbook/utility-types.html#excludeuniontype-excludedmembers

## 018. Tuple Length

For given a tuple, you need create a generic `Length`, pick the length of the tuple

For example

```typescript
type tesla = ['tesla', 'model 3', 'model X', 'model Y']
type spaceX = ['FALCON 9', 'FALCON HEAVY', 'DRAGON', 'STARSHIP', 'HUMAN SPACEFLIGHT']

type teslaLength = Length<tesla> // expected 4
type spaceXLength = Length<spaceX> // expected 5
```

**答案：**

```typescript
type Length<T extends readonly any[]> = T['length']
```

因为 tuple 类型，所以需要 readonly 。

## 004. Easy Pick

Implement the built-in `Pick<T, K>` generic without using it.

Constructs a type by picking the set of properties `K` from `T`

For example

```typescript
interface Todo {
  title: string
  description: string
  completed: boolean
}

type TodoPreview = MyPick<Todo, 'title' | 'completed'>

const todo: TodoPreview = {
  title: 'Clean room',
  completed: false,
}
```

**答案：**

```typescript
type MyPick<T, U extends keyof T> = {
  [P in U]: T[P]
}
```

TS 官方实现了 `Pick<Type,Keys>` 的 Utility Types

https://www.typescriptlang.org/docs/handbook/utility-types.html#picktype-keys

## 007.

## 008. Easy If

Implement a utils `If` which accepts condition `C`, a truthy return type `T`, and a falsy return type `F`. `C` is expected to be either `true` or `false` while `T` and `F` can be any type.

For example:

```typescript
import type { Equal, Expect } from '@type-challenges/utils'

type cases = [Expect<Equal<If<true, 'a', 'b'>, 'a'>>, Expect<Equal<If<false, 'a', 2>, 2>>]

// @ts-expect-error
type error = If<null, 'a', 'b'>
```

**答案：**

```typescript
type If<B extends boolean, T, U> = B extends true ? T : U
```

这道题比较简单，但是有一个知识点：`null` 的类型。

如果关闭了 `strictNullChecks` 选项，则 null 的会判定为 true

```typescript
type t = If<null, true, false> // t 的类型是 true
```

关于 null 的类型，ts 文档中有明确说明：

> When `strictNullChecks` is `false`, `null` and `undefined` are effectively ignored by the language. This can lead to unexpected errors at runtime.
>
> When `strictNullChecks` is `true`, `null` and `undefined` have their own distinct types and you’ll get a type error if you try to use them where a concrete value is expected.
>
> https://www.typescriptlang.org/tsconfig#strictNullChecks
>
> https://www.typescriptlang.org/docs/handbook/type-compatibility.html#any-unknown-object-void-undefined-null-and-never-assignability





## 898 Easy Includes

