# Git commit lint 规范

## 约定式提交

常见的基于 Angular 的提交规范，它包含三个内容：Header、Body、Footer。

Header 为必填项，Body 与 Footer 则是可缺省项。这些内容组成一个完整的提交格式：

```md
<type>(<scope>): <subject>

# 空一行

<body>
# 空一行
<footer>
```

- Header
  该部分仅书写一行，包括三个字段，分别是 type、scope 和 subject。

  - type：用于说明 commit 的提交类型，必选
  - scope：用于说明 commit 的影响范围，可选
  - subject：用于说明 commit 的细节描述，必须
  - type 用于说明 commit 的提交类型，包括以下选项:

  ```bash
  feat	功能	新增功能，迭代项目需求
  fix	修复	修复缺陷，修复上一版本存在问题
  docs	文档	更新文档，仅修改文档不修改代码
  style	样式	变动格式，不影响代码逻辑
  refactor	重构	重构代码，非新增功能也非修改缺陷
  perf	性能	优化性能，提高代码执行性能
  test	测试	新增测试，追加测试用例验证代码
  build	构建	更新构建，修改构建工具或外部依赖
  ci	脚本	更新脚本，修改 CI 或执行脚本配置
  chore	事务	变动事务，修改其他不影响代码的事务
  revert	回滚	回滚版本，撤销某次代码提交
  merge	合并	合并分支，合并分支代码到其他分支
  sync	同步	同步分支，同步分支代码到其他分支
  impr	改进	改进功能，升级当前功能模块
  ```

## 配置代码提交规范

### 工具

- commitizen

  commitizen 是一个帮助撰写规范 commit messages 的工具

- cz-conventional-changelog

  适配器，用来提供约定提交格式，不同的需求，可以使用不同的适配器

- cz-conventional-changelog-zh

  中文适配器

- @commitlint/config-conventional

  社区定义的提交规范

- @commitlint/cli

  校验提交信息的命令行工具 文档

- husky

  husky 是一个 Git Hook 工具。husky 是一个为 git 客户端增加 hook 的工具

- lint-staged

  暂存区代码检查工具

### 安装

```bash
pnpm i -Dw husky lint-staged
```

### 初始化 husky

1. 添加 husky 安装命令，执行完后会自动在 package.json 添加一条 script：

   ```bash
   npm pkg set scripts.prepare="husky install"
   ```

   接下来执行 prepare 命令，完成 husky 初始化，最终会在项目根路径生成 `.husky` 目录

   ```bash
   pnpm prepare
   ```

2. husky 关联 lint-staged

   lint-staged 会检查缓存区代码，但假如需要 git hooks 触发时执行检查操作，那么就要把 lint-staged 关联到 husky 中去。

   ```bash
   pnpx husky add .husky/pre-commit "pnpx lint-staged"
   ```

### 添加 lint-staged 检查逻辑

在 package.json 中添加如下代码:

```json
"lint-staged": {
 "*.{js,jsx,ts,tsx,vue}": [
   "eslint --fix",
   "prettier --write"
 ]
},
```

在这里会触发代码检查，会做两件事：

1. 修复缓存区代码风格。
2. 修复缓存区代码格式错误。

## 配合 commit-lint

虽然知道大概的 commit 规范，但需要手动去写是一件麻烦的事，我们需要采用 commitizen 这样的工具来帮助生成符合规范的 commit message。

1. 安装

   ```bash
   pnpm add commitizen cz-conventional-changelog cz-conventional-changelog-zh -Dw
   ```

2. 写入配置

   在根目录创建 .czrc ，内容如下

   ```json
   {
     "path": "cz-conventional-changelog-zh",
     "disableScopeLowerCase": false,
     "disableSubjectLowerCase": false,
     "maxHeaderWidth": 100,
     "maxLineWidth": 100,
     "defaultType": "",
     "defaultScope": "",
     "defaultSubject": "",
     "defaultBody": "",
     "defaultIssues": ""
   }
   ```

3. 配置 commitlint.config.js

   别名 `.commitlintrc.js`

   ```js
   /**
    * @reference https://commitlint.js.org/#/
    */
   module.exports = {
     extends: ['@commitlint/config-conventional'],
     rules: {
       'type-enum': [
         2,
         'always',
         [
           'feat',
           'fix',
           'wip',
           'style',
           'refactor',
           'docs',
           'build',
           'ci',
           'test',
           'perf',
           'chore',
           'revert',
           'conflict',
           'font',
           'delete',
           'stash',
         ],
       ],
       'type-case': [0],
       'type-empty': [0],
       'scope-empty': [0],
       'scope-case': [0],
       'subject-full-stop': [0, 'never'],
       'subject-case': [0, 'never'],
       'header-max-length': [0, 'always', 72],
     },
   };
   ```

4. 补充：

   对`git commit -m "xxx" message 内容的校验

   如果想使用``git commit -m "xxx"`，且对这个名的内容进行校验，则需要进行以下操作

   ```bash
   pnpm i -Dw @commitlint/config-conventional @commitlint/cli
   ```

   commitlint 负责用于对 commit message 进行格式校验。
