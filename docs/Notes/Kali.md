---
description: Kali Linux 学习笔记
keywords:
  - kali
image: https://i.imgur.com/mErPwqL.png
tags: [Kali, Linux]
---

# Kali 上手指南

![Author](https://picgo-1259617372.cos.ap-beijing.myqcloud.com/logo_chen_%E7%B4%AB%E8%89%B2.svg)

## Resources

---

## 常用配置

---

### 修改源

源位置：

```
leafpad /etc/apt/sources.list
```

阿里云：

```
deb https://mirrors.aliyun.com/kali kali-rolling main non-free contrib
deb-src https://mirrors.aliyun.com/kali kali-rolling main non-free contrib
```

官方源：

```shell
deb http://http.kali.org/kali kali-rolling main non-free contrib
deb-src http://http.kali.org/kali kali-rolling main non-free contrib
```

### 快速打开 `network`

```
--force-hostapd
/etc/init.d/network-manager start
```

### 修改 MAC 地址

查看 MAC

```
ifconfig
```

关闭网卡

```
ifconfig wlan0 down
```

配置 MAC

```
ifconfig wlan0 hw ether 11:::::
```

开启网卡

```
ifconfig wlan0 up
```

## 快速上手

---
