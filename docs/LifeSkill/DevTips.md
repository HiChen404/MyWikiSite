#

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

### 提升网速

#### 设置代理

使用 Clash 设置系统代理后,为 Git 设置代理：

```
git config —global http.proxy http://127.0.0.1:7890

git config —global https.proxy https://127.0.0.1:7890
```

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
