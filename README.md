# Vue 3 + Vite + electron

你可以使用 vue3 的 所有功能 也可以使用 electron 的所有功能

You can learn somethins about electron
[https://www.electronjs.org/](https://www.electronjs.org/)

克隆代码 开启编程吧！

同样你也可以使用脚手架来创建一个项目

在 src 下的配置文件中 修改 baseApi 为你的云函数 url 化的根 path

封装在 api/index.js 中

云函数需要处理 event

event = event.action ? event:JSON.parse(event.body)

## 开发模式

```
npm run start
```

## 预览(预览需要打包的 electron 应用)

```
npm run dist
```

## 打安装包

```
npm run build
```

## 配置

在 package.json 修改作者信息和介绍

修改 logo : 将 public 下的 logo.ico 换成自己的
