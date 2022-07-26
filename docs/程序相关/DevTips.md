---
description: 开发技巧 DevTips /Git/npm/Github
keywords:
  - Browser
  - 浏览器
image: https://picgo-1259617372.cos.ap-beijing.myqcloud.com/Picgo/2022/01/19-11-28-23-404Lab.jpeg
tags: [Skill]
---

import { Highlight } from "../../src/components/MyMDX"

<Highlight color="#aa00ff">404Lab</Highlight>

记录一下开发时用到的一些**技巧**或者开发工具常用的**配置**，方便查阅。

## NPM

### 提升下载速度

#### 使用 **[nrm](https://github.com/Pana/nrm)**

自动测试各仓库延迟，并可随意切换仓库。

```powershell
npm -g install nrm
```

测试当前以及其他镜像仓库的延迟:

```
D:\Code>nrm test

* npm ------ 836ms
  yarn ----- 813ms
  tencent -- 177ms
  cnpm ----- 1039ms
  taobao --- 234ms
  npmMirror - 14462ms
```

切换镜像仓库:

```
D:\Code>nrm use cnpm  //switch registry to cnpm

Registry has been set to: http://r.cnpmjs.org/
```

#### 设置代理

使用 Clash 为设置系统代理后，在 npm 中配置使用代理：

```
npm config set proxy=https://127.0.0.1:7890
npm config set https-proxy=https://127.0.0.1:7890
```

查看配置是否成功：

```
npm config list
```

删除代理配置：

```
npm config delete proxy
npm config delete https-proxy
```

### 替代工具

#### Pnpm

Pnpm:

```
pnpm install -g vite
```

#### Yarn

Yarn:

```
yarn add -g vite
```

## Git

### 设置代理

使用 **Clash** 设置系统代理后,为 **Git** 设置代理：

```
git config —global http.proxy http://127.0.0.1:7890

git config —global https.proxy https://127.0.0.1:7890
```

### 设置默认编辑器

我们随时可以更改 **Git** 默认编辑器:

```Git
git config --global core.editor Code
```

上面这行命令的意思是 配置全局 Git 编辑器为 **VSCode**。 (Code 来自于 VSCode 的环境变量 `D:\Microsoft VS Code\bin`)

但是当你执行 `git commit` 时，Git 会自动打开 VSCode 编辑器，提示你输入 commit 的内容。

但是，Git 并不会等待你的输入而提示报错信息: <Highlight color="#ff5252">Aborting commit due to empty commit message</Highlight>

为了使 Git 等待你的输入，需要在在执行时添加 -w 参数，同时为了避免每次添加参数，可以在 config 中全局配置：

```Git
git config --global core.editor Code -w
```

> 参考：https://stackoverflow.com/questions/9725160/aborting-commit-due-to-empty-commit-message

### 撤销提交

如果不小心进行了错误一次提交，例如：

```bash
git commit -m "Something terribly misguided"
```

但是这次提交还没有推送到服务器，那么该如何撤销这次 commit 呢？

```bash
$ git commit -m "Something terribly misguided" # (0: Your Accident)
$ git reset HEAD~                              # (1)
[ edit files as necessary ]                    # (2)
$ git add .                                    # (3)
$ git commit -c ORIG_HEAD                      # (4)
```

> 参考：
> https://stackoverflow.com/questions/927358

## Windows

### 开启 WSL

在 Store 商店中下载 **Ubuntu**

> 下载地址:https://www.microsoft.com/store/productId/9N9TNGVNDL3Q

之后，使用**管理员身份**打开 **Powershell** 运行如下命令：

```
Enable-WindowsOptionalFeature -Online -FeatureName Microsoft-Windows-Subsystem-Linux
```

> 官方安装文档：https://docs.microsoft.com/en-us/windows/wsl/install

### 开启 Sandbox

---

## 其他

### Chrome 关闭同源策略

在日常开发的时候，经常会碰到浏览器同源策略限制 AJAX 请求的问题，常见的解决方法有：

- **代理**: 适用于生产环境不发生跨域，但开发环境发生跨域
- **CORS**：定义了不同的交互模式：**简单请求**，**需预校验的请求**和**附带身份凭证的请求**。
- **JSONP**：不使用 AJAX，而生成 script 元素请求服务器，返回预定义的函数调用，将参数（数据）传递给函数。

不过在本地开发中，也可以直接关闭同源策略。

**关闭方法：**

在 **Chrome 浏览器**的快捷方式中，添加以下参数即可：

```
--args --disable-web-security --user-data-dir
```
