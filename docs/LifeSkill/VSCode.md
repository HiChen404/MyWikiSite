---
description: VSCode 指南
keywords:
  - vscode
image: https://i.imgur.com/mErPwqL.png
tags: [编程, vscode，软件]
---

# VSCode 配置指南

![Author](https://picgo-1259617372.cos.ap-beijing.myqcloud.com/logo_chen_%E7%B4%AB%E8%89%B2.svg)

## 1. 开启字体连字

```json
"editor.fontFamily": "Fira Code Light, Consolas, Microsoft YaHei",
"editor.fontLigatures": true
```

## 2. 用户代码段

```json
{
// Place your snippets for java here. Each snippet is defined under a snippet name and has a prefix, body and
    // description. The prefix is what is used to trigger the snippet and the body will be expanded and inserted. Possible variables are:
    // $1, $2 for tab stops, $0 for the final cursor position, and ${1:label}, ${2:another} for placeholders. Placeholders with the
    // same ids are connected.
    // Example:
      "Print to console": {
      "prefix": "log",
      "body": [
          "console.log('$1');",
          "$2"
      ],
      "description": "Log output to console"
}
```

Example:

```json
{
  "换行输出": {
    // 片段名称
    "prefix": "sop", // 输入UTF触发联想提升
    "body": [
      // 确认后添加的代码
      " System.out.println(\"$0\");" // $0代表光标最后停留的位置
    ],
    "description": "println" // 提示的内容
  }
}
```

## 3. 添加环境变量（GBK 与 utf 8）

```java
javac -encoding utf-8 *.java
-Dfile.encoding=UTF-8

// chcp 65001
```

## 4. VSCode 无法找到 Git

在 设置 中搜索: `git.path`

```json
"git.path":"D:\\Git\\bin\\git.exe"   //git 的目录
```
