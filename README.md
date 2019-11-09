# Study_Deme

## 准备
`npm install -g npx`
`npx create-nuxt-app project-name`

在框架中使用babel-node

```js
"scripts": {
  "dev": "cross-env NODE_ENV=development nodemon server/index.js --watch server --exec babel-node",
  "build": "nuxt build",
  "start": "cross-env NODE_ENV=production node server/index.js --exec babel-node",
  "generate": "nuxt generate"
}
```
新建`.babelrc`
```js
{
  "presets": ["es2015"]
}
```

`npm install babel-preset-es2015`

如果出现`babel`不是内部或外部命令
执行`npm install -g babel-cli` 重新启动

## 支持scss
`npm install sass-loader node-sass`

# [redis](https://www.runoob.com/redis/redis-tutorial.html)

## 安装

## 启动redis
windows 下直接点击 `redis-server.exe`
点击`redis-cli.exe`查看`redis`记录，redis为key，value的数据库
详情查看文档

## koa使用redis

安装
`npm install koa-generic-session koa-redis`

在`app.js`中添加
```js
// session
const session = require('koa-generic-session')
const Redis = require('koa-redis')

app.keys = ['keys', 'keyskeys'] // 加密处理
app.use(session({
  key: 'xiao',
  prefix: 'ch',
  store: new Redis()
}))
```
这样便连接成功`redis`数据库

在中间件中使用`redis`
```js
// pv 中间件
function pv(ctx) {
  ctx.session.count++
  global.console.log('pv', ctx.path)
}

module.exports = function() {
  return async function(ctx, next) {
    // start
    pv(ctx)
    await next()
    // end
  }
}
```

单独使用redis
```js
// redis接口
const Redis = require('koa-redis')
const Store = new Redis().client

router.get('/fix', async function(ctx, next) {
  const st = await Store.hset('fix', 'name', Math.random())
  ctx.body = {
    code: 0
  }
})
```

# MongoDB

## [安装](https://www.runoob.com/mongodb/mongodb-window-install.html)

## [mongodb 管理工具](https://robomongo.org/download)

## [使用mongoose](http://www.mongoosejs.net/docs/guide.html)

```js
1简单的方法
启动  brew services start mongodb  // 再输入mongo可以进入数据库
关闭  brew services stop mongodb 
brew services restart mongodb 重启

2  麻烦的方法
启动 mongod --config /usr/local/etc/mongod.conf
关闭 打开另一个终端窗口 切换到你的mongodb/bin目录下   ./mongo
       > use admin
        > db.shutdownServer()
```

 * 例子
在`koa2_learn`下新建`dbs`文件夹，用来操作连接`MongoDB`，新建`config.js`用来写入数据库相关配置
```js
module.exports = {
  dbs: 'mongodb://127.0.0.1:27017/dbs'
}
```
在`dbs`下新建一个`model`文件夹用来存放各种数据模型，例如新建文件`person.js`，在文件中写入
```js
const mongoose = require('mongoose')

let personSchema = new mongoose.Schema({
  name: String,
  age: Number,
})

module.exports = mongoose.model('person', personSchema)
```
这样就生成一个person
之后在`app.js`中连接`mongodb`数据库，写入如下代码
```js
// mongoose
const mongoose = require('mongoose')
const dbConfig = require('./dbs/config')

// 连接数据库
mongoose.connect(dbConfig.dbs, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
```
下来实现一个简单的用户增删改查接口
在`routes`的`users.js`文件中添加
```js
const Person = require('../dbs/models/person')

// 添加
router.post('/addPerson', async function(ctx, next) {
  const person = new Person({
    name: ctx.request.body.name,
    age: ctx.request.body.age
  })
  let code
  try {
    await person.save()
    code = 0
  } catch (e) {
    code = -1
  }
  ctx.body = {
    code
  }
})
// 查询
router.post('/getPerson', async function(ctx, next) {
  const result = await Person.findOne({
    name: ctx.request.body.name
  })
  const results = await Person.find({
    name: ctx.request.body.name
  })

  ctx.body = {
    code: 0,
    result,
    results
  }
})
// 修改
router.post('/updatePerson', async function(ctx, next) {
  const result = await Person.where({
    name: ctx.request.body.name
  }).update({
    age: ctx.request.body.age
  })

  ctx.body = {
    code: 0,
    result
  }
})
// 删除
router.post('/removePerson', async function(ctx, next) {
  const result = await Person.where({
    name: ctx.request.body.name
  }).remove()

  ctx.body = {
    code: 0
  }
})
```

在端口输入`curl -d params url`，`params`为请求参数，`url`为请求地址访问接口既可，例如：`curl -d 'name=Ali&age=10' http://localhost:3000/users/addPerson`

## 接口配置
```js
import mongoose from 'mongoose'
import bodyParser from 'koa-bodyparser'
import session from 'koa-generic-session'
import Redis from 'koa-redis'
import json from 'koa-json'

// 添加接口配置
app.keys = ['mt', 'keyskeys']
app.proxy = true
app.use(session({
  key: 'mt',
  prefix: 'mt:uid',
  store: new Redis()
}))
app.use(bodyParser({
  extendTypes: ['json', 'form', 'text']
}))
app.use(json())
// 连接数据库
mongoose.connect(dbConfig.dbs, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
// passport
app.use(passport.initialize())
app.use(passport.session())
```