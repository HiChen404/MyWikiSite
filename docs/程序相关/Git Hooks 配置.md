---
description: Husky,Lint Staged,Commitlint,Prettier Configuration
keywords:
  - Husky
  - Git hooks
  - Prettier
image: https://picgo-1259617372.cos.ap-beijing.myqcloud.com/Picgo/2022/01/19-11-28-23-404Lab.jpeg
tags: [编程]
---

<img className="Badges" src="https://picgo-1259617372.cos.ap-beijing.myqcloud.com/logo_chen_%E7%B4%AB%E8%89%B2.svg"/>


在项目的 `.git/hooks/`目录下，有许多`.example`结尾的`hook`文件，用于在特定时机执行脚本，比如`pre-commit`，`pre-push`等等，这些文件都是`git`自带的，我们可以直接使用，也可以自己写脚本，然后放到这个目录下，这样就可以在特定时机执行我们自己的脚本了。

但是通常我们会使用 `husky`来管理这些`hooks`。

`husky` 是一个`git hooks`工具，可以帮助我们触发 git 提交的各个阶段 `pre-commit`、`commit-msg`、`pre-push`,我们可以使用它在提交时对代码进行代码风格检查等操作。

本文以 `Vite` + `React` + `TypeScript` 的项目环境，配置 `Husky`, `Lint Staged`, `ESlint`, `CommitLint`, `Prettier`

## Get Started

### [Husky](https://typicode.github.io/husky/)

#### 安装 `husky`

```shell
npm install husky --save-dev
```

#### 创建 hook

1. 执行`husky`

```
npx husky install
```

2. 添加一个`hook`

比如：在 commit 之间执行 `npm test`

```
npx husky add .husky/pre-commit "npm test"
```

3. 更新`package.json`

这里添加一个脚本，方便别人在项目中安装 `husky hooks`

```json
// package.json
{
  "scripts": {
    "prepare": "husky install"
  }
}
```

:::tip
❓ **为什么不像以前一样在 package.json 中配置 hooks** ?

**Husky** 一直使用 **JavaScript** 配置 **Git Hooks**，可以使用 .**huskyrc**.js 文件或 **package**.**json** 中的字段。

在 husky(6.0.0) 版本做了 **Breaking change**: 在根目录创建 .husky 文件夹，并在内部进行钩子的按需配置。

作者原文：https://blog.typicode.com/husky-git-hooks-javascript-config/

:::

以上就安装好了 `Husky`

### Lint Staged

lint-staged 是一个在 git 暂存文件上运行 linters 的工具。它可以在提交之前运行 linters，以确保提交的代码符合代码规范。

下面的 `Prettier` 就通过 `Lint Staged` 来运行。

```
yarn add --dev lint-staged
```

### ESlint

```
yarn add --dev eslint
```

```
npm init @eslint/config
```

创建 `.eslintignore`

```
public
dist
```

在 package.json 中添加：

```json
{
  "**/*.ts?(x)": ["eslint --cache --fix"]
}
```

### Commitlint

#### 安装

```shell
npm install --save-dev @commitlint/config-conventional @commitlint/cli
```

在 `.husky/commit-msg` 中写入：

```
#!/usr/bin/env sh
. "$(dirname -- "$0")/_/husky.sh"

npx --no -- commitlint --edit ${1}
```

#### 配置规则

```shel
echo "module.exports = { extends: ['@commitlint/config-conventional'] };" > commitlint.config.js
```

规则参考： https://www.conventionalcommits.org/en/v1.0.0/

:::tip
如果遇到报错信息:

> Error [ERR_REQUIRE_ESM]: require() of ES Module

可以将 commitlint.config.**js** 更名为 commitlint.config.**cjs**

:::

### Prettier

#### 安装

```
yarn add --dev --exact prettier
```

```
echo {}> .prettierrc.json
```

在 `.prettierrc.json`中添加规则：

```json
{
  "singleQuote": true,
  "trailingComma": "all",
  "printWidth": 80
}
```

我们通常将 `Prettier` 作为 `git commit`前`hook`来运行。这样可以确保所有的提交都是格式化的，而不必等待 CI 构建完成。

例如，可以执行以下操作，以便在每次提交之前运行 `Prettier`:

```
npx husky add .husky/pre-commit "npx lint-staged"
```

在 `package.json` 中添加

```json
{
  "lint-staged": {
    "**/*.{js,jsx,ts,tsx,less,md,json}": "prettier --write --ignore-unknown"
  }
}
```

如果在项目中已经使用了 `ESlint`,需要安装 [eslint-config-prettier](https://github.com/prettier/eslint-config-prettier#installation) ，以更好的配合 `Eslint`。

```
yarn add --dev eslint-config-prettier
```

然后在 ESlint 配置中添加：

```json
{
  "extends": ["some-other-config-you-use", "prettier"]
}
```
