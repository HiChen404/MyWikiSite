
> 官方文档：https://code.visualstudio.com/api/

## 开发环境

```powershell
npm install -g yo generate-code
```

>https://code.visualstudio.com/api/get-started/your-first-extension

## 常用API

以下仅列出部分常用的API，详细文档请参考：

> https://code.visualstudio.com/api/references/vscode-api

### Window

命名空间，用于处理编辑器的当前窗口。这是可见的和活动的编辑器，以及用于**显示消息**、**选择**和**请求用户输入**的 UI 元素。

#### 获取当前活动窗口编辑器选中的文字

```js
vscode.window.activeTextEditor.document.getText(range?:Range)
```

#### 弹出提示消息

```typescript
vscode.window.showInformationMessage<T extends string>(message: string, options: MessageOptions, ...items: T[]): Thenable<T | undefined>
```

#### 展示快速选择框

```typescript
vscode.window.showQuickPick(items: readonly string[] | Thenable<readonly string[]>, options: QuickPickOptions & {canPickMany: true}, token?: CancellationToken): Thenable<string[] | undefined>
```

| Parameter                                                    | Description                                                  |
| ------------------------------------------------------------ | ------------------------------------------------------------ |
| items: readonly string[] \| [Thenable](https://code.visualstudio.com/api/references/vscode-api#Thenable)<readonly string[]> | items 数组中的项必须有 label 字段 [QuickPickItem](https://code.visualstudio.com/api/references/vscode-api#QuickPickItem) |
| options: [QuickPickOptions](https://code.visualstudio.com/api/references/vscode-api#QuickPickOptions) & {canPickMany: true} | 配置项                                                       |
| token?: [CancellationToken](https://code.visualstudio.com/api/references/vscode-api#CancellationToken) | A token that can be used to signal cancellation.             |
| Returns                                                      | Description                                                  |
| [Thenable](https://code.visualstudio.com/api/references/vscode-api#Thenable)<string[] \| undefined> | 返回 `Promise.resolve(selected items)` 或者 `undefined`      |



### Env

描述编辑器运行环境的命名空间。

#### 打开外部链接

```typescript
vscode.env.openExternal(target: Uri): Thenable<boolean>
```

使用默认应用程序在外部打开链接。根据使用的方案，这可以是:

1. 一个浏览器 (http: ，https:)

2. 邮件客户端 (mailto:)

3. VSCode 本身(VSCode: from VSCode.env.uriScheme)

**注意** `showTextDocument` 是在编辑器中打开文本文档的正确方法，而不是这个函数。



### 其他配置

#### 扩展的配置项

在 `package.json` 文件中添加：

``` package.json

"contributes": {
	"configuration": [
      {
        "title": "Gist Comment configuration",
        "properties": {
          "gist-comment.token": {
            "type": "string",
            "description": "Github Gist Token",
            "default": ""
          }
        }
      }
    ]
}
```

在该扩展设置项中就能看到该配置了：

![image-20220908111332515](https://picgo-1259617372.cos.ap-beijing.myqcloud.com/Picgo/2022/09/08-11-13-43-image-20220908111332515.png)

使用下边的命令就可以拿到用户输入的配置信息了：

```
vscode.workspace.getConfiguration().get('gist-comment.token')
```

```typescript
vscode.workspace.getConfiguration(section?: string, scope?: ConfigurationScope): WorkspaceConfiguration
```

