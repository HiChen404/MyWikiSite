import Highlight from "@site/src/components/highlight"
import ToolTip from "@site/src/components/tooltip"

要在 Windows 上使用 Vim，只需要到官网下载并安装即可，非常方便。不过，通常还需要进行一些配置，提升我们的使用体验。

## 修改 Vim 默认配置

Vim 在 Windows 上的配置文件为 `_vimrc`, 一般存放在 Vim 安装目录下，用记事本打开即可编辑。

这是我简单配置后的文件内容：

```
" Vim with all enhancements
source $VIMRUNTIME/vimrc_example.vim

set nobackup
set noundofile

colorscheme torte
set guifont=JetBrains\ Mono:h16:cANSI:qDRAFT
set confirm
set fileencoding=utf-8
syntax on
set wrap
set autoindent
set number

set smartindent
set hlsearch
```

样式上的前后对比：

<div style={{display:"flex",flexWrap:"wrap"}}>
<img width="50%" src="https://picgo-1259617372.cos.ap-beijing.myqcloud.com/Picgo/2022/09/07-18-36-28-image-20220907183625439.png" alt="image-20220907183625439"/>
<img width="50%" src="https://picgo-1259617372.cos.ap-beijing.myqcloud.com/Picgo/2022/09/07-18-36-36-image-20220907183634162.png" alt="image-20220907183634162"/>
</div>

当然除了样式，还设置了**自动换行**，**语法高亮**，**智能缩进**，**高亮搜索**等等。

具体的配置解释可以参考这个：

> https://www.ruanyifeng.com/blog/2018/09/vimrc.html

不过，既然用 Vim 了，用在命令行中使用才有灵魂。

## Windows Terminal 配置

Windows Terminal 的样式配上 Vim 的功能，体验会非常棒。

那么如何快速的使用 Vim 打开文件呢？

~~不是 `cd ...` & `vim ...`~~

我的做法是 <ToolTip content='右键单击文件可以选择在 Windows Terminal 中使用 Vim 编辑'><Highlight colorName='mint'>添加右键关联</Highlight></ToolTip>

Vim 原本已经给文件添加了右键关联了，只不过是使用 `GVim` 打开，所以我们需要自己修改注册表添加关联。

首先打开注册表，定位到 `HKEY_CURRENT_USER\SOFTWARE\Classes\*\shell`

1. 新建一个 Vim **项**，设置数值为 `Vim in WT` （给右键菜单项起个名字）
2. 在 Vim 项下**新建**一个 `command` 项，在其中**新建**一个`字符串值`：`wt -p "Command Prompt" -d "%W" cmd /k vim "%V"`

<div style={{display:"flex"}}>
<img
  src='https://picgo-1259617372.cos.ap-beijing.myqcloud.com/Picgo/2022/09/07-17-13-20-image-20220907171318109.png'
  alt='image-20220907171318109'
width="50%"
/>

<img
src='https://picgo-1259617372.cos.ap-beijing.myqcloud.com/Picgo/2022/09/07-17-15-23-image-20220907171522149.png'
alt='image-20220907171522149'
width="50%"
/>

</div>

现在就可以使用右键菜单一键在 Windows Terminal 中使用 Vim 编辑文件了！

:::note

`wt` ： Windows Terminal 的环境变量

`%W` ： 当前文件的目录

`%V` ： 当前文件的路径

`cmd /k ...`：执行 CMD 命令

这串命令意思是使用 Windows Terminal 的 CMD 配置，打开当前文件目录，并且执行 vim 打开当前文件。

:::

> 有关 Windows Terminal 命令格式可以参考：
>
> https://docs.microsoft.com/en-us/windows/terminal/command-line-arguments?tabs=windows

> Shell 命令的特殊变量可以参考：
>
> https://superuser.com/questions/136838/which-special-variables-are-available-when-writing-a-shell-command-for-a-context

<img src='https://docs.microsoft.com/en-us/windows/terminal/images/terminal-command-args.gif' width="60%" />

## backup swp 文件等问题

当你使用 Vim 编辑文件时，在当前目录会产生几个文件，这几个文件为 **备份文件**，**缓存文件**,**撤销记录文件** 等，在 Windows 中比较影响观感，所以可以进行配置以禁止生成这些文件。

在 `_vimrc`中添加：

```
set nobackup
set noundofile
set noswapfile
```

如果你想将这些文件**生成到指定目录**，而不是禁用，可以这样设置：

```
" 设置swpfile 目录
set directory=%Temp%\\Vim\\swpfiles

" 设置 undo 文件目录
set undodir=%Temp%\\vim\\undofiles

" 设置备份文件目录
set backupdir=%Temp%\\vim\\backupfiles
```

:::note

\_vimrc 文件**注释格式**为：

"

(一个**冒号**后 + 一个**空格**)

:::

参考资料:

> https://stackoverflow.com/questions/62825144/start-windows-terminal-from-the-cli-and-pass-in-an-executable-command-to-run
>
> https://stackoverflow.com/questions/9392874/bat-file-open-new-cmd-window-and-execute-a-command-in-there
>
> https://www.jianshu.com/p/3310ca7b07a1
>
> https://stackoverflow.com/questions/62825144/start-windows-terminal-from-the-cli-and-pass-in-an-executable-command-to-run
>
> https://segmentfault.com/q/1010000002692574
>
> https://stackoverflow.com/questions/1636297/how-to-change-the-folder-path-for-swp-files-in-vim
>
> https://www.ruanyifeng.com/blog/2018/09/vimrc.html
