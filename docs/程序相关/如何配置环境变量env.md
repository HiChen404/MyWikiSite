
### [Dotenv](https://www.npmjs.com/package/dotenv)

Dotenv 是一个零依赖的模块，它可以将`env`文件的变量导入到`process.env`中。

你只需要在项目根目录中新建一个`.env`文件，写入对应的环境变量：

```js
#这是一行注释
PRIVATE_KEY="Your key"
```

然后在`js`文件中写入：

```js
require('dotenv').config()
console.log(process.env.PRIVATE_KEY) //"Your key"
```

此时我们就可以从`process.env`对象中找到它们了。

在项目中通常会存在多个`env`文件，例如：`.env.prod`，`.env.dev`等等，不同的文件对应了不同的环境变量值。

所以我们也可以显式的指定`dotenv`加载的文件，以应对不同的开发场景：

```js
require('dotenv').config({ path: '.env.dev')
```



###  [Dotenv Cli](https://www.npmjs.com/package/dotenv-cli)

手动修改代码的方式指定`env`文件太麻烦了，尤其是拥有多个`env`文件的时候非常容易写错。

`Dotenv Cli` 这个工具能很好的解决这个问题。

通常我们可以在 `package.json`中添加命令：

```json
  "scripts": {
    "dev": "dotenv -e .env.dev node app.js",
    "start":"dotenv -e .env.prod node app.js"
  },
```

这样每次只用执行不同的命令就可以分别指定加载不同环境变量了。

### [Cross-env](https://www.npmjs.com/package/dotenv-cli)

`Cross-env` 可以让你拥有一个简单的命令，而不用担心平台的环境变量设置和使用问题。

```js
npm install --save-dev cross-env
```

然后在`package.json`中写入：

```json
{
  "scripts": {
    "build": "cross-env NODE_ENV=production node app.js"
  }
}
```



### [CMD：Set ](https://docs.microsoft.com/en-us/windows-server/administration/windows-commands/set_1)

Windows Cmd 中有一个命令`set`可以设置当前终端的变量。

```dos
set NODE_ENV='prod'
```

这样就设置好了一个变量，你可以打印它：

```dos
echo %NODE_ENV% 
```

此时命令行将会输出 `'prod'`。

Node 在执行时，会将当前终端的变量加载进`process.env`中，

```js
consolo.log(process.env.NODE_ENV) //'prod'
```

所以，你就能这么写了：

```json
{
  "scripts": {
    "build": "set NODE_ENV=production && node app.js"
  }
}
```



### Nodemon env 配置

`Noemon` 在检测到目录中的文件更改时可以自动重新启动节点应用程序。

我们经常在开发中使用 **Nodemon**,它启动时可以携带参数，也可以在 `package.json`中指定启动参数：

```json
"nodemonConfig": {
  "restartable": "rs",
  "ignore": [
  "node_modules/**/node_modules"
  ],
  "delay": "2500",
  "env": {
    "NODE_ENV": "development",
    "NODE_CONFIG_DIR": "./config"
  }
}
```



通过`Dotenv Cli`在运行时设置环境变量，在代码中只需要简单配置即可使用：

```js
require('dotenv').config({ path: `.env.${process.env.NODE_ENV||'dev'}` })
```

通过 `Cross-env`，`Nodemon 启动参数`和`SET 命令`,可以直接使用:

```js
const port = process.env.PORT
```



