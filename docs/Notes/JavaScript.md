---
description: JavaScript 学习笔记
keywords:
  - javascript
image: https://picgo-1259617372.cos.ap-beijing.myqcloud.com/Picgo/2022/01/19-11-28-23-404Lab.jpeg
tags: [编程, JS]
---

# JavaScript 学习笔记

<!-- # <img src="https://picgo-1259617372.cos.ap-beijing.myqcloud.com/logo_chen_%E7%B4%AB%E8%89%B2.svg"><img src="https://api.netlify.com/api/v1/badges/62b2ea8d-7e62-49d1-bb5a-b507b01377af/deploy-status"><img src="https://badgen.net/github/stars/CyC2018/CS-Notes?icon=github&color=4ab8a1" alt=""> -->

<img class="Badges" src="https://picgo-1259617372.cos.ap-beijing.myqcloud.com/logo_chen_%E7%B4%AB%E8%89%B2.svg"/>
<img class="Badges" src="https://api.netlify.com/api/v1/badges/62b2ea8d-7e62-49d1-bb5a-b507b01377af/deploy-status"/>

> 💡 🚀 ✔️ 🕝 ☢️ ☣️
>
> VS Code Font : 'JetBrains Mono Medium','Operator Mono SSm Medium','LXGW WenKai'

## 一. JS 算法与数据结构

### 1. 使用 pop() 操作数组

改变数组中数据的另一种方法是用 `.pop()` 函数。

`.pop()` 函数用来弹出一个数组末尾的值。 我们可以把这个弹出的值赋给一个变量存储起来。 换句话说就是 `.pop()` 函数移除数组末尾的元素并返回这个元素。

数组中任何类型的元素（数值，字符串，甚至是数组）都可以被弹出来 。

```js
var threeArr = [1, 4, 6];
var oneDown = threeArr.pop();
console.log(oneDown);
console.log(threeArr);
```

第一个 `console.log` 将显示值 `6`，第二个将显示值 `[1, 4]`。

### 2. 使用 shift() 操作数组

`pop()` 函数用来移出数组中最后一个元素。 如果想要移出第一个元素要怎么办呢？

这时候我们就需要 `.shift()` 了。 它的工作原理就像 `.pop()`，但它移除的是第一个元素，而不是最后一个。

示例：

```js
var ourArray = ["Stimpson", "J", ["cat"]];
var removedFromOurArray = ourArray.shift();
```

`removedFromOurArray`值为`Stimpson`，`ourArray`值为`["J", ["cat"]]`

### 3. 使用 unshift() 操作数组

不仅可以 `shift`（移出）数组中的第一个元素，也可以 `unshift`（移入）一个元素到数组的头部。

`.unshift()` 函数用起来就像 `.push()` 函数一样，但不是在数组的末尾添加元素，`unshift()` 在数组的头部添加元素。

示例：

```js
var ourArray = ["Stimpson", "J", "cat"];
ourArray.shift();
ourArray.unshift("Happy");
```

在 `shift`、`ourArray` 后值为 `["J", "cat"]`。 在 `unshift`、`ourArray` 后值为 `["Happy", "J", "cat"]`。

### 4. 比较不同值

如果要比较的值不是同一类型，相等运算符会先执行数据类型转换，然后比较值。 而严格相等运算符只比较值，不会进行数据类型转换。

**示例**

`3 == '3'` 返回 `true` ，因为 JavaScript 执行了从字符串到数字类型的转换。 `3 === '3'` 返回 false，因为类型不同且类型转换没有执行。

**提示** 在 JavaScript 中，你可以使用 `typeof` 运算符确定变量或值的类型，如下所示：

```js
typeof 3;
typeof "3";
```

`typeof 3` 返回字符串 `number`，`typeof '3'` 返回字符串 `string`。

### 5. 使用方括号表示法访问对象属性

访问对象属性的第二种方式是方括号表示法（`[]`）。 如果你想访问的属性名中包含空格，就必须使用方括号表示法来获取它的属性值。

当然，如果属性名不包含空格，也可以使用方括号表示法。

这是一个使用方括号表示法读取对象属性的例子：

```js
var myObj = {
  "Space Name": "Kirk",
  "More Space": "Spock",
  NoSpace: "USS Enterprise",
};
myObj["Space Name"];
myObj["More Space"];
myObj["NoSpace"];
```

`myObj["Space Name"]` 将会是字符串 `Kirk`，`myObj['More Space']` 将会是字符串 `Spock`，并且`myObj["NoSpace"]` 将会是字符串 `USS Enterprise`。

注意，如果属性名中包含空格，就必须使用引号（单引号或双引号）将它们包裹起来。

### 6. trim() 去除空格

`trim()`方法返回一个两头都去掉空白的字符串，并不影响原字符串本身。

```js
var data = "   1  ";
var res = data.trim();
console.log(res);
```

`res`的结果将会是 "`1`"

#### 注意:

如果 `String = " "` (n 个空格): 则 `!String.trim() = true`

如果 `String = " 1 " ` (包含 n 个空格),则 `!String.trim() = false`

```js
var res = !input || !input.trim();
//若输入为 空 或 全为空格,则 res 值为 true
```

### 7. 循环嵌套

如果你有一个二维数组，可以使用相同的逻辑，先遍历外面的数组，再遍历里面的子数组。 下面是一个例子：

```js
var arr = [
  [1, 2],
  [3, 4],
  [5, 6],
];
for (var i = 0; i < arr.length; i++) {
  for (var j = 0; j < arr[i].length; j++) {
    console.log(arr[i][j]); //输出了 `arr` 中的每个子元素
  }
}
```

这里一次输出了 `arr` 中的每个子元素。 提示，对于内部循环，我们可以通过 `arr[i]` 的 `.length` 来获得子数组的长度，因为 `arr[i]` 本身就是一个数组。

### 8. 递归

#### ·使用递归代替循环

递归是函数调用自身的操作。 为了便于理解，有如下任务：计算数组内元素前 `n` 的元素乘积。 使用 `for` 循环， 可以这样做：

```js
function multiply(arr, n) {
  var product = 1;
  for (var i = 0; i < n; i++) {
    product *= arr[i];
  }
  return product;
}
```

下面是递归写法，注意代码里的 `multiply(arr, n) == multiply(arr, n - 1) * arr[n - 1]`。 这意味着可以重写 `multiply` 以调用自身而无需依赖循环。

```js
function multiply(arr, n) {
  if (n <= 0) {
    return 1;
  } else {
    return multiply(arr, n - 1) * arr[n - 1];
  }
}
```

递归版本的 `multiply` 详述如下。 在 base case 里，也就是 `n <= 0` 时，返回 1。 在 `n` 比 0 大的情况里，函数会调用自身，参数 n 的值为 `n - 1`。 函数以相同的方式持续调用 `multiply`，直到 `n <= 0` 为止。 所以，所有函数都可以返回，原始的 `multiply` 返回结果。

**注意：** 递归函数在没有函数调用时（在这个例子是，是当 `n <= 0` 时）必需有一个跳出结构，否则永远不会执行完毕。

---

#### ·使用递归创建正计时

现在来学习一个更复杂的函数，函数返回一个从 `1` 到传递给函数的指定数字的连续数字数组。

正如上一个挑战提到的，会有一个 base case。 base case 告诉递归函数什么时候不再需要调用其自身。 这是简单 情况，返回得到的值。 还有 recursive call，继续用不同的参数调用自身。 如果函数无误，一直执行直到 base case 为止。

比如，如果想写一个递归函数，返回一个数字 `1` 到 `n` 的连续数组。 这个函数需要接收一个参数 `n` 代表最终数字。 然后会持续的调用自身，传入一个比 `n` 更小的值一直到传入的值是 `1` 为止。 函数如下：

```javascript
function countup(n) {
  if (n < 1) {
    return [];
  } else {
    const countArray = countup(n - 1);
    countArray.push(n);
    return countArray;
  }
}
console.log(countup(5));
```

值 `[1, 2, 3, 4, 5]` 将显示在控制台中。

起初，这似乎是违反直觉的，因为 `n` 的值*递减*，但是最终数组中的值却*递增*。 之所以发生这种情况，是因为在递归调用返回之后，才调用 push。 在将 `n` pushed 进数组时，`countup(n - 1)` 已经调用赋值成功并返回了 `[1, 2, ..., n - 1]`。

---

#### ·使用递归创建一个倒计时

已经定义了一个函数 `countdown`，函数有一个参数（`n`）。 函数应该基于参数 `n` 递归调用返回 `n` 到 `1` 的连续数字的数组。 如果函数以小于 1 的参数调用，函数应该返回空数组。 比如，用 `n = 5` 调用函数应该返回数组 `[5, 4, 3, 2, 1]`。 函数必需使用递归函数调用自身，不能使用任何形式的循环。

```js
function countdown(n) {
  if (n < 1) {
    return [];
  } else {
    const countArray = countdown(n - 1);
    countArray.unshift(n);

    return countArray;
  }
}
```

#### ·使用递归来创建一个数字序列

已经定义好了 `rangeOfNumbers` 函数，包含两个参数。 函数应该返回一个连续数字数组，`startNum` 参数开始 `endNum` 参数截止。 开始的数字小于或等于截止数字。 函数必需递归调用自身，不能使用任意形式的循环。 要考虑到 `startNum` 和 `endNum` 相同的情况。

```js
function rangeOfNumbers(startNum, endNum) {
  let n = endNum - startNum;
  if (n < 0) {
    return [];
  } else {
    const countArray = rangeOfNumbers(startNum, endNum - 1);
    countArray.push(endNum);
    return countArray;
  }
}
console.log(rangeOfNumbers(1, 5)); // (5) [1, 2, 3, 4, 5]
```

### 9. 测试对象的属性

有时检查一个对象属性是否存在是非常有用的。 我们可以用对象的 `.hasOwnProperty(propname)` 方法来检查对象是否有指定的属性。 `.hasOwnProperty()` 找到该属性时返回 `true`，找不到该属性时返回 `false`。

**示例**

```js
var myObj = {
  top: "hat",
  bottom: "pants",
};
myObj.hasOwnProperty("top");
myObj.hasOwnProperty("middle");
```

第一个 `hasOwnProperty` 返回 `true`，第二个返回 `false`。

### 10. 对象 //经验

- `Object`(对象) 不可使用 Object.length 获取,可以使用 JavaScript 原生方法 `Object.key(ObjectName)` 获取，其返回值为 `Array`(数组) 的对象各属性名。

  > 同样还有 `Object. values(ObjectName)`

- `if`(循环) 同样可以使用 `break`,`continue` 等关键字跳出或继续循环体。但双层循环无法跳出，需要使用 `lable` 等方法

- `array.reverse()` 可以将一个数组颠倒。

  > 在创建数组的时候可以使用 `unshift()` `pop()` 等方法代替 `push()`

### 11. 使用 parseInt 函数

`parseInt()` 函数解析一个字符串返回一个整数。 下面是一个示例：

```js
var a = parseInt("007");
```

上述函数将字符串 `007` 转换为整数 `7`。 如果字符串中的第一个字符不能转换为数字，则返回 `NaN`。

### 12. 使用 parseInt 函数并传入一个基数

`parseInt()` 函数解析一个字符串并返回一个整数。 它还可以传入第二个参数，指定了字符串中数字的基数。 基数可以是 2 到 36 之间的整数。

函数调用如下所示：

```js
parseInt(string, radix);
```

这是一个示例：

```js
var a = parseInt("11", 2);
```

变量 radix 表示 `11` 是在二进制系统中。 这个示例将字符串 `11` 转换为整数 `3`。

---

### 13. `concat()` 合并数组 <a name='concat'> </a>

`concat()` 方法用于合并两个或多个数组。此方法不会更改现有数组，而是返回一个新数组。

[查看示例](https://interactive-examples.mdn.mozilla.net/pages/js/array-concat.html)

#### 语法

```js
var new_array = old_array.concat(value1[, value2[, ...[, valueN]]])
```

#### 参数

- `valueN`可选

  将数组和 / 或值连接成新数组。如果省略了 valueN 参数参数，则 concat 会返回一个它所调用的已存在的数组的浅拷贝。

### 14. Array.prototype.`reduce()`

`reduce()` 方法对数组中的每个元素执行一个由您提供的**reducer**函数(升序执行)，将其结果汇总为单个返回值。

```js
const array1 = [1, 2, 3, 4];
const reducer = (previousValue, currentValue) => previousValue + currentValue;

// 1 + 2 + 3 + 4
console.log(array1.reduce(reducer));
// expected output: 10

// 5 + 1 + 2 + 3 + 4
console.log(array1.reduce(reducer, 5));
// expected output: 15
```

#### [语法](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array/Reduce#语法)

```js
arr.reduce(callback(accumulator, currentValue[, index[, array]])[, initialValue])
```

#### [数组里所有值的和](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array/Reduce#数组里所有值的和)

```js
var sum = [0, 1, 2, 3].reduce(function (accumulator, currentValue) {
  return accumulator + currentValue;
}, 0);
// 和为 6
```

你也可以写成箭头函数的形式：

```js
var total = [0, 1, 2, 3].reduce((acc, cur) => acc + cur, 0);
```

### 15. 数组合并方法

#### (1) <a href="#concat">Concat()</a>

#### (2) Array.Push() 循环添加

```javascript
const array1 = [1, 2, 3, 4, 5];
const array2 = ["a", "b", "c", "d", "e"];

var mergeArray = function (array1, array2) {
  for (let i = 0; i < array2.length; i++) {
    array1.push(array2[i]);
  }
  console.log(array1);
};

mergeArray(array1, array2); //输出结果为 [1, 2, 3, 4, 5, 'a', 'b', 'c', 'd', 'e']
```

#### (3) 扩展运算符

```js
const array1 = [1, 2, 3, 4, 5];
const array2 = ["a", "b", "c", "d", "e"];

var mergeArray = function (array1, array2) {
  var array3 = [...array1, ...array2];
  console.log(array3);
};

mergeArray(array1, array2); //输出结果为 [1, 2, 3, 4, 5, 'a', 'b', 'c', 'd', 'e']
```

### 16. [encodeURIComponent()](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/encodeURIComponent) 转义

`encodeURIComponent()`函数通过将一个，两个，三个或四个表示字符的 UTF-8 编码的转义序列替换某些字符的每个实例来编码 [URI](https://developer.mozilla.org/zh-CN/docs/Glossary/URI) （对于由两个“代理”字符组成的字符而言，将仅是四个转义序列）。

#### [描述](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/encodeURIComponent#描述)

`encodeURIComponent` 转义除了如下所示外的所有字符：

```
不转义的字符：
    A-Z a-z 0-9 - _ . ! ~ * ' ( )
```

`encodeURIComponent()` 和 **`encodeURI`** 有以下几个不同点：

```javascript
var set1 = ";,/?:@&=+$"; // 保留字符
var set2 = "-_.!~*'()"; // 不转义字符
var set3 = "#"; // 数字标志
var set4 = "ABC abc 123"; // 字母数字字符和空格

console.log(encodeURI(set1)); // ;,/?:@&=+$
console.log(encodeURI(set2)); // -_.!~*'()
console.log(encodeURI(set3)); // #
console.log(encodeURI(set4)); // ABC%20abc%20123 (the space gets encoded as %20)

console.log(encodeURIComponent(set1)); // %3B%2C%2F%3F%3A%40%26%3D%2B%24
console.log(encodeURIComponent(set2)); // -_.!~*'()
console.log(encodeURIComponent(set3)); // %23
console.log(encodeURIComponent(set4)); // ABC%20abc%20123 (the space gets encoded as %20)
```

### 17. Array.prototype.every()

`every()` 方法测试一个数组内的所有元素是否都能通过某个指定函数的测试。它返回一个布尔值。

**注意**：若收到一个空数组，此方法在一切情况下都会返回 `true`。

> ☣️ 必须要有返回值 `return`

#### 语法

```
arr.every(callback[, thisArg])
```

#### 参数

- `callback`

  用来测试每个元素的函数，它可以接收三个参数：`element`用于测试的当前值。`index`可选用于测试的当前值的索引。`array`可选调用 `every` 的当前数组。

- `thisArg`

  执行 `callback` 时使用的 `this` 值。

#### 返回值

如果回调函数的每一次返回都为 [truthy](https://developer.mozilla.org/zh-CN/docs/Glossary/truthy) 值，返回 `true `，否则返回 `false`。

#### Example

下例检测数组中的所有元素是否都大于 10。

```js
function isBigEnough(element, index, array) {
  return element >= 10;
}
[12, 5, 8, 130, 44].every(isBigEnough); // false
[12, 54, 18, 130, 44].every(isBigEnough); // true
```

### 18. Array.prototype.some() 可从数组中找元素

`some()` 方法测试数组中是不是至少有 1 个元素通过了被提供的函数测试。它返回的是一个 Boolean 类型的值。

**注意：**如果用一个空数组进行测试，在任何情况下它返回的都是`false`。

[查看示例](https://interactive-examples.mdn.mozilla.net/pages/js/array-some.html)

#### 语法

```
arr.some(callback(element[, index[, array]])[, thisArg])
```

#### 参数

- `callback`

  用来测试每个元素的函数，接受三个参数：`element`数组中正在处理的元素。`index` 可选数组中正在处理的元素的索引值。`array`可选`some()`被调用的数组。

- `thisArg`可选

  执行 `callback` 时使用的 `this` 值。

#### 返回值

数组中有至少一个元素通过回调函数的测试就会返回**`true`**；所有元素都没有通过回调函数的测试返回值才会为 false。

#### Example

下面的例子检测在数组中是否有元素大于 10。

```js
function isBiggerThan10(element, index, array) {
  return element > 10;
}

[2, 5, 8, 1, 4].some(isBiggerThan10); // false
[12, 5, 8, 1, 4].some(isBiggerThan10); // true
```

### 19. `Number.isInteger()`

**`Number.isInteger()`** 方法用来判断给定的参数是否为整数。

[查看示例](https://interactive-examples.mdn.mozilla.net/pages/js/number-isinteger.html)

#### 语法

```
Number.isInteger(value)
```

#### 参数

- `value`

  要判断此参数是否为整数

#### 返回值

判断给定值是否是整数的 [`Boolean`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Boolean) 值。

#### 示例

```js
Number.isInteger(0); // true
Number.isInteger(1); // true
Number.isInteger(-100000); // true

Number.isInteger(0.1); // false
Number.isInteger(Math.PI); // false

Number.isInteger(Infinity); // false
Number.isInteger(-Infinity); // false
Number.isInteger("10"); // false
Number.isInteger(true); // false
Number.isInteger(false); // false
Number.isInteger([1]); // false
```

### 20. 表格项筛选

综合使用 `str.toLowerCase()`

https://element.eleme.cn/#/zh-CN/component/table

```js
userList.filter(
  (item) => !search || item.name.toLowerCase().includes(search.toLowerCase())
);
//userList为一个数组对象
```

- **`arr.filter()`** 方法创建一个新数组, 其包含通过所提供函数实现的测试的所有元素 (一定要 `return`)

- **`str.toLowerCase()`** 会将调用该方法的字符串值转为小写形式，并返回。

- **`str.includes()`** 方法用于判断一个字符串是否包含在另一个字符串中，根据情况返回 true 或 false。

### 21. [Array.prototype.indexOf()](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array/indexOf)

`indexOf()` 方法返回调用它的 [`String`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/String) 对象中第一次出现的指定值的索引，从 `fromIndex` 处进行搜索。如果未找到该值，则返回 -1。

#### 语法

```
arr.indexOf(searchElement[, fromIndex])
```

#### 参数

- `searchElement`

  要查找的元素

- `fromIndex` 可选

  开始查找的位置。如果该索引值大于或等于数组长度，意味着不会在数组里查找，返回-1。如果参数中提供的索引值是一个负值，则将其作为数组末尾的一个抵消，即-1 表示从最后一个元素开始查找，-2 表示从倒数第二个元素开始查找 ，以此类推。 注意：如果参数中提供的索引值是一个负值，并不改变其查找顺序，查找顺序仍然是从前向后查询数组。如果抵消后的索引值仍小于 0，则整个数组都将会被查询。其默认值为 0.

#### 返回值

首个被找到的元素在数组中的索引位置; 若没有找到则返回 -1

```js
// Vue 计算器案例

//判断有没有输入加减乘除
isOperator(character){
	return ['+','-','×','÷'].indexOf(character) > -1
},
```

### 22.**使用 for...in 语句遍历对象**

如果我们想要遍历对象中的所有**`属性`**， 只需要使用 JavaScript 中的 for...in 语句即可。 以遍历 `users` 对象的属性为例：

```js
for (let user in users) {
  console.log(user);
}
```

这将在控制台打印 `Alan`、`Jeff`、`Sarah` 和 `Ryan` - 每个值占一行。

在上面的代码中，我们定义了一个 `user` 变量。 可以观察到，这个变量在遍历对象的语句执行过程中会一直被重置并赋予新值，结果就是不同的用户名打印到了 console 中。

**注意：**对象中的键是无序的，这与数组不同。 因此，一个对象中某个属性的位置，或者说它出现的相对顺序，在引用或访问该属性时是不确定的。

### 23. Object.keys() 对象属性的数组

我们可以给 `Object.keys()` 方法传入一个对象作为参数，来生成包含对象所有键的数组。 这会返回一个由对象中所有属性（字符串）组成的数组。

需要注意的是，数组中元素的顺序是不确定的。

### 24. `for...in` 与 `for...of` 的区别

一句话概括：for in 是遍历（object ）键名，for of 是遍历（array）键值。

> References: [for…in 和 for…of 的用法与区别 - SegmentFault 思否](https://segmentfault.com/a/1190000022348279)

### 25. ASCII，Unicode 和 UTF-8

> References: [字符编码笔记：ASCII，Unicode 和 UTF-8 - 阮一峰的网络日志 (ruanyifeng.com)](https://www.ruanyifeng.com/blog/2007/10/ascii_unicode_and_utf-8.html)

- 静态 `String.fromCharCode()` 方法返回由指定的 UTF-16 代码单元序列创建的字符串.

  ```js
  console.log(String.fromCharCode(89, 80, 110, 111));

  // expected output: "YPno"
  ```

- `charCodeAt()` 方法返回 0 到 65535 之间的整数

  ```js
  const sentence = "The quick brown fox jumps over the lazy dog.";

  const index = 4;

  console.log(
    `The character code ${sentence.charCodeAt(
      index
    )} is equal to ${sentence.charAt(index)}`
  );

  // expected output: "The character code 113 is equal to q"
  ```

### 26. 可选链接操作符

**可选链**操作符( **`?.`** )允许读取位于连接对象链深处的属性的值，而不必明确验证链中的每个引用是否有效。`?.` 操作符的功能类似于 `.` 链式操作符，不同之处在于，在引用为空([nullish](https://developer.mozilla.org/zh-CN/docs/Glossary/Nullish) ) ([`null`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/null) 或者 [`undefined`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/undefined)) 的情况下不会引起错误，该表达式短路返回值是 `undefined`。与函数调用一起使用时，如果给定的函数不存在，则返回 `undefined`。

当尝试访问可能不存在的对象属性时，可选链操作符将会使表达式更短、更简明。在探索一个对象的内容时，如果不能确定哪些属性必定存在，可选链操作符也是很有帮助的。

如下的例子在一个不含 `bar` 成员的 Map 中查找 `bar` 成员的 `name` 属性，因此结果是 `undefined`。

```js
let myMap = new Map();
myMap.set("foo", { name: "baz", desc: "inga" });

let nameBar = myMap.get("bar")?.name;
```

### 27. 空值合并运算符

**空值合并操作符**（**`??`**）是一个逻辑操作符，当左侧的操作数为 [`null`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/null) 或者 [`undefined`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/undefined) 时，返回其右侧操作数，否则返回左侧操作数。

与[逻辑或操作符（`||`）](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Operators/Logical_OR)不同，逻辑或操作符会在左侧操作数为[假值](https://developer.mozilla.org/zh-CN/docs/Glossary/Falsy)时返回右侧操作数。也就是说，如果使用 `||` 来为某些变量设置默认值，可能会遇到意料之外的行为。

```js
//使用:

if ((value ?? "") === "") {
  console.log("isNull");
} else {
  console.log("hasValue");
}

//取代：

if (value !== null && value !== undefined && value !== "") {
  console.log("hasValue");
} else {
  console.log("isNull");
}
```

### 28.Set()

```js
let arr = [1, 2, 3, 4, 5, 8, 9, 0, 0];
let arr2 = [3, 5, 5, 7];

//1.数组去重
// let result = [...new Set(arr)];
// console.log(result);

//2.交集
// let s2 = new Set(arr2);
// let result = [...new Set(arr)].filter((item) => new Set(arr2).has(item));
// console.log(result);

//3.并集
// let union = [...new Set([...arr, ...arr2])];
// console.log(union);

//3.差集(两种情况)
// let diff = [...new Set(arr)].filter((item) => !new Set(arr2).has(item));
// console.log(diff);
```

## 二. DOM 操作

### 1. element.insertAdjacentHTML

**`insertAdjacentHTML()`** 方法将指定的文本解析为 [`Element`](https://developer.mozilla.org/zh-CN/docs/Web/API/Element) 元素，并将结果节点插入到 DOM 树中的指定位置。它不会重新解析它正在使用的元素，因此它不会破坏元素内的现有元素。这避免了额外的序列化步骤，使其比直接使用 innerHTML 操作更快

#### [语法](https://developer.mozilla.org/zh-CN/docs/Web/API/Element/insertAdjacentHTML#语法)

```
element.insertAdjacentHTML(position, text);
```

- `position`

  一个 [`DOMString`](https://developer.mozilla.org/zh-CN/docs/Web/API/DOMString)，表示插入内容相对于元素的位置，并且必须是以下字符串之一：`'beforebegin'`：元素自身的前面。`'afterbegin'`：插入元素内部的第一个子节点之前。`'beforeend'`：插入元素内部的最后一个子节点之后。`'afterend'`：元素自身的后面。

- `text`

  是要被解析为 HTML 或 XML 元素，并插入到 DOM 树中的 [`DOMString`](https://developer.mozilla.org/zh-CN/docs/Web/API/DOMString)。

#### [位置名称的可视化](https://developer.mozilla.org/zh-CN/docs/Web/API/Element/insertAdjacentHTML#位置名称的可视化)

```html
<!-- beforebegin -->
<p>
  <!-- afterbegin -->
  foo
  <!-- beforeend -->
</p>
<!-- afterend -->
```

**注意：** beforebegin 和 afterend 位置，仅在节点在树中且节点具有一个 parent 元素时工作。

**例子:**

```js
let html = "<li><span>测试3</span><span>X</span></li>";
ul.insertAdjacentHTML("beforeend", html);
```

### 2. 删除元素节点

## ES6

### 1. 导出/导入

#### 1.1 默认导出

```js
let n1 = 10; //定义模块私有成员 n1

function show() {} //定义模块私有方法 shallowReactive

export default {
  //使用 export default 默认导出语法,向外共享 n1 和 show 两个成员
  n1,
  show,
};
```

#### 1.2 按需导入

`test.js`

```js
export let s1 = "111";

export let s2 = "ccc";

export function say() {}
```

`index.js`

```js
import { s1, say } from "./text.js";

console.log(s1); //输出结果为 "111"
```

#### 1.3
