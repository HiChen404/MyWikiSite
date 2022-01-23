---
description: Windows 提高生产力技能
keywords:
  - vscode
  - 资源
  - 学习
  - 互联网
  - Windows
image: https://picgo-1259617372.cos.ap-beijing.myqcloud.com/Picgo/2022/01/19-11-28-23-404Lab.jpeg
tags: [Windows, Skill]
---

# Windows 小技巧

<img class="Badges" src="https://picgo-1259617372.cos.ap-beijing.myqcloud.com/logo_chen_%E7%B4%AB%E8%89%B2.svg"/>
<img class="Badges" src="https://api.netlify.com/api/v1/badges/62b2ea8d-7e62-49d1-bb5a-b507b01377af/deploy-status"/>

## 快速批量创建文件夹

如何快速批量创建以**学生姓名**命名的文件夹？

1. 在 Excel 中 选中**学生姓名**列 -> **复制列** -> 在**空白处选择性粘贴** -> **粘贴内容转置**

   <img src="https://picgo-1259617372.cos.ap-beijing.myqcloud.com/Picgo/2022/01/20-17-07-22-%E5%8A%A8%E7%94%BB1.gif" alt="动画1" width="50%" />

2. 复制转置后的**学生姓名行** -> **新建空白文本文件** -> 输入 "md" 并 **粘贴** 学生姓名行 -> 另存为 `ANSI` 格式的 `bat` 文件

   <img src="https://picgo-1259617372.cos.ap-beijing.myqcloud.com/Picgo/2022/01/20-17-17-49-%E5%8A%A8%E7%94%BB2.gif" alt="动画2" width="60%" />

3. 在任意目录打开此 bat 文件即可批量创建文件夹。

## 快速查看电脑信息

在`运行`中运行 `dxdiag` 即可查看该电脑配置信息。

<img src="https://picgo-1259617372.cos.ap-beijing.myqcloud.com/Picgo/2022/01/08-13-55-13-image-20220108135506810.png" width="60%" />

## "无权限删除文件 ⚠"应对办法

### 方法 1：进入安全模式获取最高控制权

1.打开 “**设置**”

2.选择 “**更新和安全**” > “**恢复**”

3.在“**高级启动**”下，选择“**立即重新启动**”。

4.在 PC 重新启动进入“**选择选项**”屏幕后，选择“**疑难解答**”>“**高级选项**”>“**启动设置**”>“**重新启动**”。

5.PC 重新启动后，你会看到选项列表。

6.选择 `4` 或 `F4` 以**安全模式启动**。

以安全模式启动后，即可对文件进行删除。

### 方法 2：对当前用户提权

1. 运行 `lusrmgr.msc` 打开**本地用户和组**。

   <img src="https://picgo-1259617372.cos.ap-beijing.myqcloud.com/Picgo/2022/01/23-19-39-23-image-20220123193916113.png" alt="image-20220123193916113" width="40%" />

2. 依次打开 **组**-> **Administrators** -> **添加** ， 在输入框中**输入当前用户名**，保存后**重启计算机**即可提权。

<img src="https://picgo-1259617372.cos.ap-beijing.myqcloud.com/Picgo/2022/01/23-19-46-54-image-20220123194654653.png" alt="image-20220123194654653" width="65%" />

#### Tips：各个用户组对应的的权限

<img src="https://picgo-1259617372.cos.ap-beijing.myqcloud.com/Picgo/2022/01/23-19-50-56-image-20220123195056431.png" alt="image-20220123195056431" width="65%" />

#### 可能遇到的问题

- 找不到 `lusrmgr.msc`

​ 1. 运行 `mmc.exe` 打开 **控制台**

​ 2. 点击 **文件** -> **添加/删除管理单元** ，按照下图指示操作后重启即可。

<img src="https://picgo-1259617372.cos.ap-beijing.myqcloud.com/Picgo/2022/01/23-20-01-22-image-20220123200109151.png" alt="image-20220123200109151" width="80%" />

## 右键添加管理员取得所有权

在删除文件时，有时候会出现权限问题而拒绝删除，很是让人头疼，不过我们可以通过**右键管理员取得所有权**获得删除权限。

你只需要复制下面的代码到文本编辑器中，另存为 `reg` 文件,双击运行即可。

```powershell title="右键管理员取得所有权.reg"
Windows Registry Editor Version 5.00

[HKEY_CLASSES_ROOT\*\shell\runas]

@="管理员取得所有权"
"NoWorkingDirectory"=""

[HKEY_CLASSES_ROOT\*\shell\runas\command]

@="cmd.exe /c takeown /f \"%1\" && icacls \"%1\" /grant administrators:F"

"IsolatedCommand"="cmd.exe /c takeown /f \"%1\" && icacls \"%1\" /grant administrators:F"

[HKEY_CLASSES_ROOT\exefile\shell\runas2]

@="管理员取得所有权"

"NoWorkingDirectory"=""

[HKEY_CLASSES_ROOT\exefile\shell\runas2\command]

@="cmd.exe /c takeown /f \"%1\" && icacls \"%1\" /grant administrators:F"

"IsolatedCommand"="cmd.exe /c takeown /f \"%1\" && icacls \"%1\" /grant administrators:F"

[HKEY_CLASSES_ROOT\Directory\shell\runas]

@="管理员取得所有权"

"NoWorkingDirectory"=""

[HKEY_CLASSES_ROOT\Directory\shell\runas\command]

@="cmd.exe /c takeown /f \"%1\" /r /d y && icacls \"%1\" /grant administrators:F /t"

"IsolatedCommand"="cmd.exe /c takeown /f \"%1\" /r /d y && icacls \"%1\" /grant administrators:F /t"

```
