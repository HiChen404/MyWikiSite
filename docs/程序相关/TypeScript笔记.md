---
description: TypeScript 笔记
keywords:
  - typescript
image: https://picgo-1259617372.cos.ap-beijing.myqcloud.com/Picgo/2022/01/19-11-28-23-404Lab.jpeg
tags: [编程, typescript]
---

<img className="Badges" src="https://picgo-1259617372.cos.ap-beijing.myqcloud.com/logo_chen_%E7%B4%AB%E8%89%B2.svg"/>
<img className="Badges" src="https://api.netlify.com/api/v1/badges/62b2ea8d-7e62-49d1-bb5a-b507b01377af/deploy-status"/>

## Utility Types

> https://github.com/HiChen404/type-challenges/

### Omit<Type,Keys>

Constructs a type by picking all properties from `Type` and then removing `Keys` (string literal or union of string literals).

通过从 `Type` 中选取所有属性，然后移除 `Keys` (字符串文字或字符串文字的并集)来构造类型。

```typescript
interface Todo {
  title: string
  description: string
  completed: boolean
  createdAt: number
}

type TodoPreview = Omit<Todo, 'description'>
//expect:
//type TodoPreview = {
//    title: string;
//    completed: boolean;
//    createdAt: number;
//}
```

#### 实现 MyOmit

借助 Exclude 类型:

```typescript
type MyOmit<T, U> = {
  [P in Exclude<keyof T, U>]: T[P]
}
```

原始实现方式：

```typescript
type MyOmit<T, U extends keyof T> = {
  [P in keyof T as P extends U ? never : P]: T[P]
}
```

### Exclude<UnionType, ExcludedMembers>

Constructs a type by excluding from `UnionType` all union members that are assignable to `ExcludedMembers`.

通过从 `UnionType` 中排除可分配给 `ExcludedMembers` 的所有联合成员来构造类型.

```typescript
type T = Exclude<'a' | 'b' | 'c', 'a'> //Expect： type T = "b" | "c"
```

#### 实现 Exclude

```typescript
type MyExclude<T, K> = T extends K ? never : T
```

### Extract<Type, Union>

Constructs a type by extracting from `Type` all union members that are assignable to `Union`.

通过从 Type 中提取可分配给 Union 的所有联合成员来构造类型。

```typescript
type T0 = Extract<'a' | 'b' | 'c', 'a' | 'f'>
//expect:
//type T0 = "a"

type T1 = Extract<string | number | (() => void), Function>
//expect
//type T1 = () => void
```

#### 实现 Extract

```typescript
type MyExtract<T, U> = T extends U ? T : never
```

### Record<Keys, Type>

Constructs an object type whose property keys are `Keys` and whose property values are `Type`. This utility can be used to map the properties of a type to another type.

构造属性键为 `Keys`、属性值为 `Type` 的对象类型。此实用工具可用于将类型的属性映射到另一个类型。

```typescript
interface CatInfo {
  age?: number
  color?: string
}

type CatName = 'Tom' | 'Jerry'

const cats: Record<CatName, CatInfo> = {
  Tom: { age: 2 },
  Jerry: { age: 3 },
}
```

#### 实现 Record

```typescript
type MyRecord<K extends string | number | symbol, T> = {
  [P in K]: T
}
```

## Some Cases

```typescript
interface IProduct {
  id: number
  title: string
  price: number
  inventory: number
}

type CartProduct = {
  quantity: number
} & Omit<IProduct, 'inventory'>
```

> 这篇学习记录学习了以下内容，非常感谢！
>
> https://www.typescriptlang.org/
>
> https://github.com/type-challenges/type-challenges
