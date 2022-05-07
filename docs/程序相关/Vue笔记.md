---
description: Vue 指南
keywords:
  - vue
image: https://picgo-1259617372.cos.ap-beijing.myqcloud.com/Picgo/2022/01/19-11-28-23-404Lab.jpeg
tags: [编程, Vue]
---

<img className="Badges" src="https://picgo-1259617372.cos.ap-beijing.myqcloud.com/logo_chen_%E7%B4%AB%E8%89%B2.svg"/>
<img className="Badges" src="https://api.netlify.com/api/v1/badges/62b2ea8d-7e62-49d1-bb5a-b507b01377af/deploy-status"/>

## VUE-CLI

### 1. 安装

```
npm install -g @vue/cli
# OR
yarn global add @vue/cli
```

### 2. 创建指定名称的项目

```
vue create my-project
# OR
vue ui
```

---

### 1. Src 目录构成

```
assets : 静态资源文件: CSS , Image
components : 封装的可复用的组件
main.js 入口文件
App.vue 是项目的根组件
```

### 2. Vue project 的运行流程

通过 `main.js`把 `App.vue` 渲染到 `index.html` 的指定区域

### 3. `main.js`

```js
import Vue from 'vue' // import Vue packet 得到 Vue 构造函数
// import App from './App.vue' //import App.vue 根组件
import test from './components/test.vue'

Vue.config.productionTip = false

//Create Vue instance object

new Vue({
  render: h => h(test), //把 render 函数指定的组件,渲染到 HTML 页面中(替换 el 或 $mount 挂载的元素)
}).$mount('#app') //
```

## Vue 组件

### 4. VUE 组件的组成

```
template : 组件的模板结构
script :
style :
```

### 5. VUE 组件

#### `data`

组件中的 `data` 不能像之前一样指向对象,必须是一个函数

```vue
export default{ data(){ return{ message:"", }, methods:{ } } }
```

### 6. 组件的使用

#### 使用组件的三个步骤

1. `import` 导入需要的组件

```js
import componentName from '@/components/componentName.vue'
```

2. 使用 `components` 注册组件

```js
components: {
}
```

3. 使用组件

### 7. 注册全局组件

在 Vue project 的 `main.js` 入口文件中, 通过 `Vue.component()` 方法, 可以注册全局组件.

```js
//导入需要全局注册的组件
import componentName from './compnents/componentName.vue'

//参数1 : 字符串格式, 表示注册名称
//参数2 : 需要被全局注册的那个组件
Vue.component('MyComponentName', componentName)
```

### 8. 子向父传值

- #### 自定义事件

```js
//子组件:
this.$emit("eventName",value)

//父组件
@eventName="newEventName";

function newEventName(value){
    console.log(value);
}
```

### 9. 父向子传值

- #### 自定义属性

### 10. 兄弟组件间的数据共享

- #### `EventBus`

```js
//EventBus.js

import Vue from 'vue'

//向外共享 Vue 的示例对象

export default new Vue()
```

- #### 发送方

```js
//message 是 data 中要发送的数据
//导入 eventBus 获取 Vue 实例对象
import bus from './eventBus.js'

//methods
function sendMsg() {
  bus.$emit('share', message)
}
```

- #### 接收方

```js
//data 中 msgFromLeft 用于接收数据

import bus from './eventBus.js'

bus.$on('share', value => {
  this.msgFromLeft = value
})
```

## Vue Router

### Quick Start

#### 1. 安装 `vue-router`

```js
npm run install --save vue-router
```

#### 2. 创建路由模块

在 ==src== 源代码目录下, 新建 `router/index.js` 路由模块, 并**初始化**如下代码:

```js
//导入 Vue 和 Vue Router 的包

import Vue from 'vue'
import VueRouter from 'vue-router'

//调用 Vue.use() 函数, 把 VueRouter 安装为 Vue 的插件

Vue.use(VueRouter)

//创建路由的实例对象

const router = new VueRouter({
  //routes 是一个数组,定义对应关系
  routes: [
    { path: '/', redirect: '/login' },
    { path: '/login', component: Login },
    { path: '/home', component: Home },
  ],
})

// 向外共享路由的实例对象

export default router
```

#### 3. 挂载路由实例对象

在 `main.js`中导入:

```js
import router from './router/index.js'
```

挂载 ==路由实例对象==

```js
import Vue from 'vue'
import App from './App.vue'
// 导入路由模块
import router from './router/'

// 导入样式
import './assets/css/bootstrap.css'
import './index.css'

Vue.config.productionTip = false

new Vue({
  render: h => h(App),
  router: router, //挂载路由实例对象,可简写为 router
}).$mount('#app')
```

### 路由重定向 `redirect`

```js
//创建路由的实例对象

const router = new VueRouter({
  routes: [{ path: '/', redirect: Home }],
})
```

### 子路由

```js
const router = new VueRouter({
  routes: [
    {
      path: '/about',
      component: About,
      //定义子路由
      children: [
        { path: 'tab1', component: Tab1 },
        { path: 'tab2', component: Tab2 },
      ],
    },
  ],
})
```

### 动态路由

把 `Hash` 地址中的**可变部分**定义为**参数项**, 从而提高路由规则的复用性.

在 `vue-router` 中使用 ==英文的冒号==`:` 来定义路由的参数项:

```js
//路由中的动态参数以 : 进行声明,冒号后面的是动态参数的名称

{path: "/movie/:id" , components: "Movie"}

//将以下 3 个路由规则, 合并成为一个,提高了路由规则的复用性

//{path: "./moive/1 , components: "Movie"}
//{path: "./moive/2 , components: "Movie"}
//{path: "./moive/3 , components: "Movie"}
```

### 路由守卫

在 `index.js` 中使用:

```js
// 判断是否有权限登录到后台 Home
router.beforeEach(function (to, from, next) {
  if (to.path == '/home') {
    const token = localStorage.getItem('token')
    if (token) {
      next()
    } else {
      next('/login')
    }
  } else {
    next()
  }
})
```

### 特性

- #### 当安装了 vue-router 以后, 就可以使用 `router-link` 替换 `<a>`

  ```html
  <router-link to="/home"></router-link>
  ```

- `this.$route` 是路由的==参数对象==

- `this.$router` 是路由的==导航对象==

- 查询参数用 `this.route.query` 来获取.

- 在 `this.$route` 中, `path` 是路径部分, `fullPath` 是完整的地址.

  ```bash
  /movie/2?name=zs&age=20   =>   fullPath

  /movie/2	=>	path
  ```

## VUE Quick Strat

### 1. Watch 侦听器

只想监听某个对象的单一变化

```


```

### 2. Computed 计算属性

动态计算出来的属性值可以被 `模板结构` 或者 `methods` 方法使用

```

```

### 3. `Ref` 引用

### 4. `this.$nextTick(cb)`

在到达下一个生命周期执行 `callbackFunction` 的内容,防止被 `v-if` 控制的元素未及时完成渲染.

```js
showInput() {
      this.inputVisible = true; //设置 v-if:true

      this.$nextTick(() => {
        this.$refs.inputRef.focus();
      });
    }
```

### 5. 自定义指令 `directives`

```vue
directives:{ color:{ bind(el,binding){ console.log(el); //绑定自定义属性 color 的 DOM 元素 console.log(binding); // 对象: 其中
value 是向自定义指令中传递的值 } } }
```

- #### Example

`h1` 绑定了自定义指令 `color`, 并向其传递了一个值 `color`,`color`是一个值为`red`的变量(data 中), 执行 `directives` 中 `color` 中的方法.

```vue
<template>
  <h1 v-color="color">HTML</h1>
</template>

<script>
  export default {

  data(){
          return {
              color: red;
          }
      }
  directives:{
      //定义名为 color 的指令,指向一个配置对象
  	color:{
          //形参中的 el 表示当前指令所绑定到的 DOM 对象
          //形参中的 binding 表示
          //bind 函数只调用 1 次
  		bind(el,binding){
   			el.style.color = "red" ;
  			//触发了 v-color 的 bind 函数
  		}
          update(el,binding){
              // DOM 更新时执行
              el.style.color = binding.value
          }
  	}
  }

  }
</script>
```

- #### 全局自定义指令

定义在 `main.js`中,与 filter 类似.

```vue
Vue.directive('color',{ bind(el,binding){ } })
```

## 解决跨域问题

1. 在 `vue.config.js` 中配置:

```js
module.exports = {
  devServer: {
    port: 8080, //本地服务器端口 💡
    open: true,
    proxy: 'https://www.escook.cn', //api根路径 💡
  },
}
```

2. 在 `main.js` 中配置:

```js
import Vue from 'vue'
import App from './App.vue'
import router from './router'
import axios from 'axios'

// axios.defaults.baseURL = "https://www.escook.cn";   //将源 API 根地址注释 💡

axios.defaults.baseURL = 'http://localhost:8080' // 配置为本地 serve 地址 💡

Vue.prototype.$http = axios

Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App),
}).$mount('#app')
```

## 错误排查

### 1. Element 表单验证注意事项

- `:model="ruleForm"` 绑定的==ruleForm==值是否挂载成功并且操作的是否是这个表单。

  > ☢️ 注意: 是 `:model` 而不是 `v-model `

- `:rules="rules"` 校验的规则格式绑定的 rules 是否定义并且格式正确为对象数组。

- `el-form-item` 中的 `prop="name"` 是否和 `rules` 中的 `name: [ { required: true, message: '请输入活动名称', trigger: 'blur' }, ], ` 的名称一致.

  两个 name 是相同的，element 的校验就是根据这个 prop 找对应的输入框的。

- `<el-input v-model="ruleForm.name"></el-input>` 的 v-model="ruleForm.name"确保对象 ruleForm 中有 name 这个属性！

### 2. Vue 路由规则

==正确==:

```js
const router = new VueRouter({
  routes: [
    { path: '/', redirect: '/users' },
    { path: '/users', component: UserList },
  ],
})
```

> `redirect: "/users"` 而不是 `redirect: UserList`

==错误==:

```js
const router = new VueRouter({
  routes: [
     { path: "/", redirect: "/users" }, //	正确
❗    {path:"/",redirect:"/users"},   //	错误 ❗
    { path: "/users", component: UserList },
  ],
});
```

### 3. 表单预校验

#### 3.1 自定义校验规则

```js
var checkAge = (rule, value, cb) => {
  if (!Number.isInteger(value)) {
    return cb(new Error('请填写整数')) // cb() 必须被调用 !
  }
  if (value > 100 || value < 1) {
    return cb(new Error('年龄必须在1到100 之间')) // cb() 必须被调用 !
  }
  cb() // cb() 必须被调用 !
}
```

> :bomb: 注意 自定义校验规则 必须 调用 `cb()` 回调函数
>
> 💡 🚀 ✔️ 🕝 ☢️ ☣️

#### 3.2 预校验

```js
//点击了添加按钮,预校验
    onAddNewUser() {
      this.$refs.myaddForm.validate((valid) => {
        console.log(valid);
      });
    },
```

> 预校验的结果根据 `自定义校验规则` 与 `普通校验规则` 的结果确定,返回值为 `boolean`
>
> 💡 🚀 ✔️ 🕝 ☢️ ☣️

### 4. 事件处理

#### 4.1 `@keyup.enter="methods"` 事件与 `ElementUI` 冲突, 无法触发 `methods` 方法

==解决办法==:

使用 `@keyup.native.enter`

```js
<el-input @keyup.native.enetr="methods" ></el-input>
//使用 @keyup.native.enter 覆盖原有封装的keyup事件即可
```

### 5. Vscode 代码格式化

==Vetur==

```json
"vetur.format.defaultFormatter.html": "js-beautify-html",
"vetur.format.defaultFormatter.js": "vscode-typ=script",
"vetur.format.defaultFormatterOptions": {
        "js-beautify-html": {
            "wrap_attributes": "auto"
        },
        "prettyhtml": {
            "printWidth": 100,
            "singleQuote": false,
            "wrapAttributes": false,
            "sortAttributes": false
        }
 },
```

### 6. ElementUI Form.`resetFields()` 失效

根据官方文档 , `resetFieleds()` 生效的前提是: 1. 获取到 Form 元素 (ref) 2.Form-Item Attributes 必须有 `prop` 属性.

> prop: 表单域 model 字段，在使用 validate、resetFields 方法的情况下，该属性是必填的
