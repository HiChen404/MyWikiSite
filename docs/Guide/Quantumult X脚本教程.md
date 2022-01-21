---
description: Quantumult X 脚本使用教程
keywords:
  - Quantumult X
image: https://is4-ssl.mzstatic.com/image/thumb/Purple126/v4/65/6d/7c/656d7cb8-2ca2-60af-d29f-ca6d547ae88a/AppIcon-0-0-1x_U007emarketing-0-0-0-7-0-0-sRGB-0-0-0-GLES2_U002c0-512MB-85-220-0-0.png/230x0w.webp
tags: [Quantumult X]
---

# Quantumult X 脚本使用教程

<img class="Badges" src="https://picgo-1259617372.cos.ap-beijing.myqcloud.com/logo_chen_%E7%B4%AB%E8%89%B2.svg"/>
<img src="https://is2-ssl.mzstatic.com/image/thumb/Purple113/v4/65/04/d1/6504d15f-eb22-526e-1055-352290c0feb9/pr_source.png/230x0w.webp" width="20%"/>

> 🚀 **TG 频道**: https://t.me/EnjoyDigitalLife

如果你还没有听说过 Quantumult X 或对它还不太了解，那么我强烈建议你简单学习它的使用方法，这将极大的提高你的生活与工作的生产力。

Quantumult X 是功能强大的网络工具，Quantumult X 目前有着极其强大的社区和广泛的开源项目，对于我们来说它可以实现 **去广告**，**解锁各大软件 VIP**,**自动打卡签到**，**淘宝京东比价** 等各种功能，毕竟大部分应用是通过与服务器通信获得账户信息，如果可以解密和修改这些通信，我们就可以在不开通 VIP 的情况下获得任何想要的功能。

很多人在获得了 Quantumult X 之后却不不知道该如何使用，发挥不出这个工具的强大优势，那么这篇文章就详细讲解一下 Quantumult X 中 `重写` 和 `MitM` 的用法，也就是我们常说的 **圈 X 脚本**的用法。

> 关于 Quantumult X 的免费获取或购买方式请关注：[🚀 TG 频道](https://t.me/EnjoyDigitalLife)
>
> **Quantumult X App Store** : https://apps.apple.com/us/app/quantumult-x/id1443988620

## 前置知识

**重写**： 重写用于修改 HTTP 或 HTTPS 的请求与相应。

**MitM**: MitM 根证书用于 HTTPS 解析。只有配置了主机名的请求才会被 MitM 模块进行解析。

`重写` 与 `MitM` 在 Quantumult X 中主要用来实现去广告，解锁会员等功能。

对于 HTTPS 的请求与相应的重写，需要配置本地证书才能对其进行拦截解析。

> 证书配置方法：Quantumult X `设置` > `MitM` > `生成证书` > `配置证书`(安装并信任)

## 举例 (NOMO CAM)

> 以 [NOMO CAM](https://apps.apple.com/cn/app/nomo-cam-%E4%BD%A0%E7%9A%84%E6%8B%8D%E7%AB%8B%E5%BE%97/id1362548649) `解锁永久会员`为例。

在网上搜索脚本时，脚本分享者通常会给你一串链接，这个链接就包含了脚本的 `说明`，`重写规则`，`路径规则` 等配置信息。

> 例如这个链接：https://raw.githubusercontent.com/HiChen404/QuantumultX/master/NOMO_CAM_Pro_Crack.js

打开这个连接后，你会看到一个`原始格式`的文本内容：

### 脚本文件

```javascript
/*
 *
 *
脚本功能：NOMO CAM 解锁订阅(包括 NOMO1 NOMO2)
软件版本：1.5.131
软件地址：https://apps.apple.com/cn/app/nomo-cam-%E4%BD%A0%E7%9A%84%E6%8B%8D%E7%AB%8B%E5%BE%97/id1362548649
脚本作者：Hausd0rff
更新时间：2022-01-06
获取帮助：公众号：404Lab 
电报频道：https://t.me/EnjoyDigitalLife
使用声明：⚠️此脚本仅供学习与交流，
        请勿转载与贩卖！⚠️⚠️⚠️

*******************************

[rewrite_local]

# > NOMO CAM 解锁订阅
^https?:\/\/nomo\.dafork\.com\/api\/v3\/register\/phone_signin$ url script-response-body https://raw.githubusercontent.com/HiChen404/QuantumultX/master/NOMO_CAM_Pro_Crack.js

[mitm] 

hostname = nomo.dafork.com
*
*
*/

var obj = JSON.parse($response.body);

obj.sign =
  "eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NTQ1MzUzNiwiYWNjZXNzX3Rva2VuIjoiY3RsMEdIT2RkVnUtWmpIR3RIMTNVQVRWVDRTRzVKaXY3OWJUWlExMDY1eUJSYy1BeXlPQ2h6VWdFelhSRXo5TTFiWTZCcWI2ZmVpVTdyZmEycUNXMFNUM21pb05odzRnNFZDT2ZDcThwVVJ4M3VqdTBtZW1ZdC1DM1J5MkR0clhPRTIxRUtXV3VNVUFoM0I5bGNDWWJCeUo2Vm82WjlTbzVBazNVWHlkTE1hd3NBMjVGbkU3YXZJdnBsRzZYeFMyUWJUZmJ6ak8iLCJwcm9kdWN0cyI6W10sInByb2R1Y3RfaW9zX2lkcyI6W10sImlzX3N1YnNjcmlwdGlvbl91c2VyIjp0cnVlLCJyZWNlaXZlZF9maWxtX2lkcyI6W10sInRpbWVzdGFtcCI6MTY0MjE3MTMyN30.jHA-7GdSnFDLTwOX-CR7U6twWasjRhNKC3W_ikpCjkjbNOPJvYNPkVVG9Tc6jgJAaAQoV6iHWxIoxIdtnZQQwwuHcNpfx6GBHieYN3NWmNwKznjKonreueZJmis6RJhNt5Egq1k5xc0boqIUqY7oIT8NeRBCSDawih-QZ0GFQTHodY3qH1RqPNBTCnaz4VdFK964AK8I9JwIhSncLpfdlY15cGRhgVhkGe52BVHhpLriqp8ULw1qonjEjWziZLHLM8sPf1eR-E1S31TojCsYM14U4THaR1Cc20RBQxTBuC26tcLgXkuh3lN-MFBeSxhEzswQZ9PzcfBi6TNyNzkYjQ";

$done({
  body: JSON.stringify(obj),
});
```

这个脚本主要分为两个部分:第一部分为`注释说明`，第二部分为 `JS代码`。

#### 注释说明

```js
/*
 *
 *
脚本功能：NOMO CAM 解锁订阅(包括 NOMO1 NOMO2)
软件版本：1.5.131
软件地址：https://apps.apple.com/cn/app/nomo-cam-%E4%BD%A0%E7%9A%84%E6%8B%8D%E7%AB%8B%E5%BE%97/id1362548649
脚本作者：Hausd0rff
更新时间：2022-01-06
获取帮助：公众号：404Lab 
电报频道：https://t.me/EnjoyDigitalLife
使用声明：⚠️此脚本仅供学习与交流，
        请勿转载与贩卖！⚠️⚠️⚠️

*******************************

[rewrite_local]

# > NOMO CAM 解锁订阅
^https?:\/\/nomo\.dafork\.com\/api\/v3\/register\/phone_signin$ url script-response-body https://raw.githubusercontent.com/HiChen404/QuantumultX/master/NOMO_CAM_Pro_Crack.js

[mitm] 

hostname = nomo.dafork.com
*
*
*/
```

> 注释说明通常为 `/* */` 开头与结尾标识符之间的内容，这些内容不会被软件解析，主要用于对脚本的作用描述。

由注释说明我们可以知道，这个脚本实现了 NOMO CAM 相机的解锁订阅功能，并且:

##### 重写规则是：

```
^https?:\/\/nomo\.dafork\.com\/api\/v3\/register\/phone_signin$ url script-response-body https://raw.githubusercontent.com/HiChen404/QuantumultX/master/NOMO_CAM_Pro_Crack.js
```

##### MitM 规则是：

```js
hostname = nomo.dafork.com;
```

有了这些规则，我们就可以[进行具体配置](#进行配置) 。

#### JS 代码

```js
var obj = JSON.parse($response.body);

obj.sign =
  "eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NTQ1MzUzNiwiYWNjZXNzX3Rva2VuIjoiY3RsMEdIT2RkVnUtWmpIR3RIMTNVQVRWVDRTRzVKaXY3OWJUWlExMDY1eUJSYy1BeXlPQ2h6VWdFelhSRXo5TTFiWTZCcWI2ZmVpVTdyZmEycUNXMFNUM21pb05odzRnNFZDT2ZDcThwVVJ4M3VqdTBtZW1ZdC1DM1J5MkR0clhPRTIxRUtXV3VNVUFoM0I5bGNDWWJCeUo2Vm82WjlTbzVBazNVWHlkTE1hd3NBMjVGbkU3YXZJdnBsRzZYeFMyUWJUZmJ6ak8iLCJwcm9kdWN0cyI6W10sInByb2R1Y3RfaW9zX2lkcyI6W10sImlzX3N1YnNjcmlwdGlvbl91c2VyIjp0cnVlLCJyZWNlaXZlZF9maWxtX2lkcyI6W10sInRpbWVzdGFtcCI6MTY0MjE3MTMyN30.jHA-7GdSnFDLTwOX-CR7U6twWasjRhNKC3W_ikpCjkjbNOPJvYNPkVVG9Tc6jgJAaAQoV6iHWxIoxIdtnZQQwwuHcNpfx6GBHieYN3NWmNwKznjKonreueZJmis6RJhNt5Egq1k5xc0boqIUqY7oIT8NeRBCSDawih-QZ0GFQTHodY3qH1RqPNBTCnaz4VdFK964AK8I9JwIhSncLpfdlY15cGRhgVhkGe52BVHhpLriqp8ULw1qonjEjWziZLHLM8sPf1eR-E1S31TojCsYM14U4THaR1Cc20RBQxTBuC26tcLgXkuh3lN-MFBeSxhEzswQZ9PzcfBi6TNyNzkYjQ";

$done({
  body: JSON.stringify(obj),
});
```

> JS 代码会被软件解析，实现相应功能，使用者一般不需要关注。

### 进行配置

- 打开 Quantumult X 设置 > 分别打开 `重写` 与 `MitM` 功能
  <img src="https://picgo-1259617372.cos.ap-beijing.myqcloud.com/Picgo/2022/01/18-15-39-29-IMG_1921.PNG" alt="IMG_1925" width="25%"/>

- **Quantumult X 设置 > 重写 > 添加**

在上文的 [注释说明](#注释说明) 中我们得知`重写规则`是:

```
^https?:\/\/nomo\.dafork\.com\/api\/v3\/register\/phone_signin$       //用以匹配的 URL (正则表达式)
url
script-response-body //类型
https://raw.githubusercontent.com/HiChen404/QuantumultX/master/NOMO_CAM_Pro_Crack.js //脚本路径 (脚本文件的地址)
```

分别对应了以下配置项:

​ ·类型

​ `script-response-body`

​ ·用以匹配的 URL (正则表达式)

​ `^https?:\/\/nomo\.dafork\.com\/api\/v3\/register\/phone_signin$`

​ ·脚本路径 (脚本文件的地址)

​ `https://raw.githubusercontent.com/HiChen404/QuantumultX/master/NOMO_CAM_Pro_Crack.js`

<img src="https://picgo-1259617372.cos.ap-beijing.myqcloud.com/Picgo/2022/01/18-15-39-29-IMG_1921.PNG" alt="IMG_1921" width="25%"/>

- 因为本脚本使用了 MitM 模块,所以需要首先安装 `HTTPS 证书`, HTTPS 证书只用安装一次,长期有效, 如果安装过请跳过此步骤.

​ 证书配置方法：Quantumult X `设置` > `MitM` > `生成证书` > `配置证书`(安装并信任)

- 随后配置 MitM : **Quantumult X 设置 > MitM > 添加主机名**

​ 在上文的 [注释说明](#注释说明) 中我们得知`MitM 规则`是:

```js
hostname = nomo.dafork.com;
```

<img src="https://picgo-1259617372.cos.ap-beijing.myqcloud.com/Picgo/2022/01/18-15-52-25-IMG_1923.JPEG" alt="IMG_1923" width="25%" center/>
<img-annotation>@404lab</img-annotation>

配置完成后,打开 Quantumult X 代理开关,打开软件即可解锁相应功能。

> 参考文档:
>
> https://github.com/erdongchanyo/Rules/blob/main/Quantumult%20X/README.md
