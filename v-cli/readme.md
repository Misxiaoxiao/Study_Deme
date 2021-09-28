# 脚手架开发流程

1. 创建空项目/文件夹

2. 通过 `npm/yarn` 初始化 `package` 文件
```js
npm init 或者 yarn init
```

3. 安装插件
```js
yarn add figlet chalk inquirer shelljs ora download-git-repo commander -S
// OR
npm install figlet chalk inquirer shelljs ora download-git-repo commander -S
```

4. 创建 `bin` 目录

5. 开发命令行
```js
/*
 * 开发后台脚手架，快速生成标准架构
 */
const program = require('commander')
program.version('1.1.0')
```
