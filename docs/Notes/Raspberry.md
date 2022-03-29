---
description: Raspberry 上手指南
keywords:
  - Raspberry
image: https://picgo-1259617372.cos.ap-beijing.myqcloud.com/Picgo/2022/01/19-11-28-23-404Lab.jpeg
tags: [硬件, 文档]
---

<img className="Badges" src="https://picgo-1259617372.cos.ap-beijing.myqcloud.com/logo_chen_%E7%B4%AB%E8%89%B2.svg"/>
<img className="Badges" src="https://api.netlify.com/api/v1/badges/62b2ea8d-7e62-49d1-bb5a-b507b01377af/deploy-status"/>

## 1. Resource

`Files`: [F:\Raspberry](F:\Raspberry)
`Tools`:

（补充：树莓派驱动，识别网卡）

## 2. Start

### <span id="jump1">2.1 USB 网卡连接</span>

·使用`USB Gadget`驱动将`USB-OTG`模拟为有线网卡，之前需要的设置比较繁琐，好在新版的`Raspbian`内核不需要额外安装补丁，可以直接启用，另外虚拟出来的和有线网卡基本一样，不像串口那样只能打开一个终端。方法如下：

1.模拟网卡

```
# 修改boot分区里的config.txt文件，在新一行增加如下内容
dtoverlay=dwc2
# 修改boot分区里的cmdline.txt文件，在rootwait后面增加如下内容，注意每个参数之间空格分开，且都是在同一行
modules-load=dwc2,g_ether
```

2.联网(共享网络)

使用 [USB 网卡连接](#jump1)后，共享网络
<img src="https://picgo-1259617372.cos.ap-beijing.myqcloud.com/20210605162901.png" width="500px"/>

3.使用`Xshell`连接

![img](https://picgo-1259617372.cos.ap-beijing.myqcloud.com/90fd3da6gy1fd6h6bny1gj20yz0ezq6s)

`Default Password`

```
Username:pi 	password:raspberry
```

### 2.2 WIFI 连接

1.连接树莓派后

```bash
sudo nano /etc/wpa_supplicant/wpa_supplicant.conf
//nano 是文件编辑器
```

> nano 编辑器 `CTRL`+`O`保存 `CTRL`+`X`离开

2.修改配置文件 [wpa_supplicant.conf](https://picgo-1259617372.cos.ap-beijing.myqcloud.com/20210606120223.conf'>wpa_supplicant.conf)

> 或者直接在 windows 上直接上传至`boot`目录 , 并创建`ssh`文件

```wpa_supplican.conf
country=CN
ctrl_interface=DIR=/var/run/wpa_supplicant GROUP=netdev
update_config=1

network={
ssid="Mac"
psk="aishangwang."
key_mgmt=WPA-PSK
priority=1
}

network={
ssid="vivo"
psk="12345678"
priority=2
}


network={
ssid="iWatch"
psk="12341234."
priority=3
}
```

### 2.3 VNC 连接

·先查看树莓派 IP 地址

·再通过 VNC 连接

> 或者关闭 VNC Proxy 后直接输入：`raspberry.local`

## 3. Usage

#### 1.设置

```bash
sudo raspi-config
```

## 3. Others

3.1 Linux `Python3`替换`Python2`:

```bash
sudo update-alternatives --install /usr/bin/python python /usr/bin/python2 100
sudo update-alternatives --install /usr/bin/python python /usr/bin/python3 150
```

如果要切换到`Python2`,执行:

```bash
sudo update-alternatives --config python
```
