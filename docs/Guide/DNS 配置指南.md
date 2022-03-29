---
description: DNS 配置指南
keywords:
  - dns
image: https://picgo-1259617372.cos.ap-beijing.myqcloud.com/Picgo/2022/01/19-11-28-23-404Lab.jpeg
tags: [DNS]
---

# DNS/DoH/DoT 配置

<img className="Badges" src="https://picgo-1259617372.cos.ap-beijing.myqcloud.com/logo_chen_%E7%B4%AB%E8%89%B2.svg"/>

## 简单说明

---

### 最常见的 DNS 配置：

> 💡 🚀 ✔️ 🕝 ☢️ ☣️ 本示例默认关闭本机所有代理！

<img src="https://picgo-1259617372.cos.ap-beijing.myqcloud.com/Picgo/2022/01/09-12-11-43-image-20220109121136390.png" alt="image-20220109121136390"  width="60%" />

在未指定 DNS 服务器地址的情况下，系统将自动获得 DNS 服务器地址，一般即上级路由器配置的 DNS 服务器地址。

<img src="https://picgo-1259617372.cos.ap-beijing.myqcloud.com/Picgo/2022/01/09-12-18-11-image-20220109121811288.png" alt="image-20220109121811288" width="46%" />

所以最终此时的 DNS 服务器地址由路由器指配。

<img src="https://picgo-1259617372.cos.ap-beijing.myqcloud.com/Picgo/2022/01/09-12-42-15-image-20220109124215248.png" alt="Ping baidu.com 本机向路由器发起DNS查询" width="60%" />

修改路由器的 DNS 服务器也很简单，在路由器的网络配置界面指定即可。

<img src="https://picgo-1259617372.cos.ap-beijing.myqcloud.com/Picgo/2022/01/09-12-22-28-image-20220109122228007.png" alt="image-20220109122228007" width="60%" />

> 若要修改 `DNS 服务器`地址，可在以上任一环节(本机或路由器)修改。

## DNS 常用配置

---

### 刷新 `DNS` :

```powershell
ipconfig /flushdns
```

## DoH/DoT

**我们的 DNS 流量没有经过加密**，运营商或是第三方还是能够清楚的知道：我们发起了一个 DNS 请求，我们想要知道 xxx 网站的地址。

为了避免隐私的泄露，所以我们可以使用 DoT 或 DoH 的方式进行加密。

DoT 全称是 DNS over TLS，它使用 TLS 协议来传输 DNS 协议。TLS 协议是目前互联网最常用的安全加密协议之一，我们访问 HTTPS 的安全基础就是基于 TLS 协议的。相比于之前使用无连接无加密的 UDP 模式， TLS 本身已经实现了保密性与完整性。

DoH 全称是 DNS over HTTPS，它使用 HTTPS 来传输 DNS 协议。DoH 的安全原理与 DoT 一样，他们之间的区别只在于：DoH 有了 HTTP 格式封装，更加通用。

DoT 在专用端口上通过 TLS 连接 DNS 服务器，而 DoH 是基于使用 HTTP 应用程序层协议，将查询发送到 HTTPS 端口上的特定 HTTP 端点,这里造成的外界感知就是端口号的不同，DoT 的端口号是 853，DoH 端口号 443。

### 接入 DoT/DoH

接入 DoT/DoH 与普通的 公共 DNS 解析服务(Public DNS) 配置方式有略微的区别。

#### Windows

#### iOS

#### 浏览器

<img src="https://main.qcloudimg.com/raw/456bec2e871a1e33f96c58bfff04625f.png" alt="img" width="80%" />
<img-annotation>123</img-annotation>

### DoT/DoH 服务器

#### 国内知名公共 DoT/DoH 服务器

**阿里 DoT/DoH (Alidns)**

```
DoT 地址: dns.alidns.com

DoH 地址: https://dns.alidns.com/dns-query
```

**腾讯 DoT/DoH (DNSPod)**

```
DoT 地址: dot.pub

DoH 地址: https://doh.pub/dns-query

DoH (国密 SM2,基于腾讯云政企国密解决方案) 地址: https://sm2.doh.pub/dns-query
```

**TWNIC Quad 101**

```
由台湾网络资讯中心提供的 DoT/DoH 服务器。当然也同时提供 IPv4 和 IPv6 DNS 服务。

DoT 地址: dns.twnic.tw

DoH 地址: https://dns.twnic.tw/dns-query
```

#### 国外知名公共 DoT/DoH 服务器

**Google Public DoT/DoH**

```
DoT 地址: dns.google

DoH 地址: https://dns.google/dns-query
```

**Cloudflare DoT/DoH**

```
DoT 地址: cloudflare-dns.com

DoH 地址: https://1dot1dot1dot1.cloudflare-dns.com/
```

> 参考文档：
>
> https://dns.icoa.cn/dot-doh/
>
> https://sspai.com/post/56783
