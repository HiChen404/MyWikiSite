使用 git 开发项目有很长时间了，已经熟练的掌握了基本的 git 操作（删除和卸载）。

但是，个人开发还是太随意了，随意的 commit，tag 等等，如果和别人合作开发的话，一定会被骂的很惨...

> 注：本文内容大部分引用自:
>
> **超详细的前端工程化入门教程** https://chinese.freecodecamp.org/news/front-end-engineering-tutorial/ @谭光志
>
> (写的很不错，学到了很多)

git 规范包括两点：分支管理规范、git commit 规范。

那么，如何能简洁易懂的描述一次 commit 呢？

### commit 规范

#### commit 内容

```
    <type>(<scope>): <subject>  //必填, 描述主要修改类型和内容
    <BLANK LINE>
    <body>   //描述为什么修改, 做了什么样的修改, 以及开发的思路等等
    <BLANK LINE>
    <footer> //可以写注释，BUG 号链接
```

1. scope: commit 影响的范围, 比如: route, component, utils, build...
2. subject: commit 的概述
3. body: commit 具体修改内容, 可以分为多行.
4. footer: 一些备注, 通常是 BREAKING CHANGE 或修复的 bug 的链接.

#### type: commit 的类型

```
feat: 新功能、新特性
fix: 修改 bug
perf: 更改代码，以提高性能
refactor: 代码重构（重构，在不影响代码内部行为、功能下的代码修改）
docs: 文档修改
style: 代码格式修改, 注意不是 css 修改（例如分号修改）
test: 测试用例新增、修改
build: 影响项目构建或依赖项修改
revert: 恢复上一次提交
ci: 持续集成相关文件修改
chore: 其他修改（不在上述类型中的修改）
release: 发布新版本
workflow: 工作流相关文件修改
```

#### 示例

以 [docusaurus](https://github.com/facebook/docusaurus/commits/main) 仓库为例：

    refactor: customize code block line highlight color via CSS var (https://github.com/facebook/docusaurus/pull/7176)

```
fix(cli): always show error stack to unhandled rejection (#7218)
```

```
docs: remove mention of "template" from README installation (#7208)
```

### branch 管理规范

一般项目分主分支（master）和其他分支。

当有团队成员要开发新功能或改 BUG 时，就从 master 分支开一个新的分支。例如项目要从客户端渲染改成服务端渲染，就开一个分支叫 ssr，开发完了再合并回 master 分支。

如果改一个 BUG，也可以从 master 分支开一个新分支，并用 BUG 号命名（不过我们小团队嫌麻烦，没这样做，除非有特别大的 BUG）。

#### git 规范验证

验证 git commit 规范，主要通过 git 的 `pre-commit` 钩子函数来进行。当然，你还需要下载一个辅助工具来帮助你进行验证。

参考资料：

https://chinese.freecodecamp.org/news/front-end-engineering-tutorial/
