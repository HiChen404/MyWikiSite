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

### 从接口中拓展新类型

例如需要从 `IProduct` 这个商品接口中添加 `quantity` 属性，并且剔除 `inventory` 属性以生成一个 `CartProduct` 类型。

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

/** 预期：
type CartProduct = {
  id: number
  title: string
  price: number
  // highlight-next-line
  quantity: number
}
*/
```

### 从数组元素值中定义 Union Type

students 是一个包含每个学生信息的数组：

```typescript
const students = [
  {
    name: 'tom',
    age: 20,
  },
  {
    name: 'jack',
    age: 19,
  },
]
```

如果想要提取出 `students` 中学生的姓名组成一个新的联合类型，可以这样做：

```typescript
type studentName = 'tom' | 'jack'
```

但是这样每当 `students` 数组中的元素增加了，那么就需要手动更新 `studentName` 的定义，这明显不够优雅。

所以可以使用 `const` 类型断言配合**索引访问**的方式来优雅实现：

```typescript
const students = [
  {
    name: 'tom',
    age: 20,
  },
  {
    name: 'jack',
    age: 19,
  },
] as const

type studentName = typeof students[number]['name']

// 预期：
// type studentName = 'tom' | 'jack'
```

但在实际开发中，我们通常会预先定义每个 `student` 的类型：

```typescript
// highlight-start
type Student = {
  name: string
  age: number
}
// highlight-end

// highlight-next-line
const students: Student[] = [
  {
    name: 'tom',
    age: 20,
    sex: 'male',
  },
  {
    name: 'jack',
    age: 19,
    sex: 'female',
  },
]

type studentName = typeof students[number]['name']

// 不符合预期：
// highlight-next-line
// type studentName = string
```

但是你会发现先前的解决方案就失效了，这是因为 `Student[]` 是一个可变类型。

如果要解决这个问题，就需要使用**泛型函数**：

```typescript
type Student<T> = {
  //highlight-next-line
  name: T
  age: number
}

function defineStudents<T extends string>(students: Student<T>[]) {
  return students
}

const students = defineStudents([
  {
    name: 'tom',
    age: 20,
    sex: 'male',
  },
  {
    name: 'jack',
    age: 19,
    sex: 'female',
  },
])

type studentName = typeof students[number]['name']

// 符合预期:
// type studentName =  'tom' | 'jack'
```

> 不过有个问题：为什么 `defineStudents` 需要 `T extends string` 才有效果？

这个案例学习了这一篇文章： https://fehey.com/typescript-const-generic-union-type/ 非常感谢！

> 这篇学习记录参考和学习了以下内容：
>
> https://www.typescriptlang.org/
>
> https://github.com/type-challenges/type-challenges
