## Vite @ alias 配置



通常在项目中，我们喜欢用 `@` 别名等方式导入一个组件。

![image-20220806201921577](https://picgo-1259617372.cos.ap-beijing.myqcloud.com/Picgo/2022/08/06-20-19-33-image-20220806201921577.png)

这样就不用 `../../` 这样一层一层找文件了，开发起来更加方便。

如何在 Vite 中配置别名呢？


:::note warning
注意： 这里需要安装 `path` 包解析目录。
:::

在 vite.config 配置文件中添加：
```js
export default defineConfig({
 resolve: {
   alias: {
     "@": path.resolve(__dirname, "src"),
     "components": path.resolve(__dirname, "src/components"),
     "styles": path.resolve(__dirname, "src/styles"),
   },
 },
 plugins: [vue()],
})
```

不过配置以后，ts 还会报错：

`找不到模块“@/components/forwardRef”或其相应的类型声明。`

只需要在 `tsconfig.json`中添加下面的配置即可：

```js tsconfig.json
"compilerOptions": {
  "paths":{
    "@/*": ["src/*"],
    "@components/*": ["src/components/*"],
   },
}
```

