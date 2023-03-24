# fe-ui

## 搭建流程

1. 初始化

   ```bash
   mkdir fe-ui
   cd fe-ui
   pnpm init
   ```

2. 添加工作区

## 参考链接

https://cloud.tencent.com/developer/article/2208595
https://juejin.cn/post/7168277813223981063#heading-5
https://www.jianshu.com/p/7470f49931cd
https://juejin.cn/post/7098609682519949325

yarn add 软件名 --registry https://registry.npm.taobao.org/

```bash
# win 下 pm2 启动 verdaccio
pm2 start C:\develop\nvm\npm\node_modules\verdaccio\bin\verdaccio
```

`.changeset/conifg.json`

```json:title
{
"$schema": "<https://unpkg.com/@changesets/config@2.2.0/schema.json>",
"changelog": "@changesets/cli/changelog", //更新日志生成函数的加载地址
"commit": true, //自动提交 version 的改动
"fixed": [], //捆绑发布的包
"linked": [],// 配置哪些包要共享版本
"access": "public", //公开，如果你想阻止一个包被发布到 npm，在包的 package.json 中设置 private: true （可选值：restricted，不公开）
"baseBranch": "main", //主分支名
"updateInternalDependencies": "patch", //是否主动更新 package 的依赖，patch、minor
"ignore": [] //指定不发布的包
}

```

发布顺序

```bash
pnpm run change
pnpm run change:version
pnpm run release
```
