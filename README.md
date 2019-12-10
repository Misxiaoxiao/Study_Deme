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



## next 集成 antd

`npm install @zeit/next-css`

新建文件`next.config.js`，在文件中写入
```js
const withCss = reuqire('@zeit/next-css')

if (typeof require !== 'undefined') {
  require.extensions['.css'] = file => {}
}

module.exports = withCss({})
```

`npm install antd babel-plugin-import`

新建文件`.babelrc`，在文件中写入
```js
{
  "presets": ["next/babel"],
  "plugins": [
    [
      "import",
      {
        "libraryName": "antd",
        // "style": "css"
      }
    ]
  ]
}
```

引入样式
在`/page`下新建`_app.js`，文件中写入
```js
import App from 'next/app'
import 'antd/dist/antd.css'

export default App
```

`server.js`
```js
const Koa = require('koa')
const next = require('next')

const dev = process.env.NODE_ENV !== 'production'
const app = next({ dev })
const handle = app.getRequestHandler()

app.prepare().then(() => {
  const server = new Koa()

  server.use(async (ctx, next) => {
    await handle(ctx.req, ctx.res)
    ctx.respond = false
  })

  server.listen(3000, () => {
    console.log('koa server listening on 3000')
  })
})
```

### 路由跳转

Link
```js
import Link from 'next/link'

export default () => (
  <Link href="/a">
    <Button>A</Button>
  </Link>
)
```
`Link`只能有唯一的子节点

Router模块
```js
import Link from 'next/link'
import Router from 'next/router'
import { Button } from 'antd'

export default () => {
  function goToTestB() {
    Router.push('/test/b')
  }

  return (
    <>
      <Link href="/a" title="AAA">
        <Button>A</Button>
      </Link>
      <Button onClick={goToTestB}>test B</Button>
    </>
  )
}
```

参数
只能通过`query`
```js
// link
<Link href="/a?id=1" title="AAA">
</Link>

// router
Router.push('/test/b', {
  query: {
    id: 2
  }
})
```

改变路由的显示方式
```js
// link
<Link href="/a?id=1" as="/a/1" title="AAA">
</Link>

// router
Router.push('/test/b', {
  query: {
    id: 2
  }
}, '/test/b/2')
```
刷新`/test/b/2`之后页面会404

`server.js`添加
```js
const Koa = require('koa')
const Router = require('koa-router')
const next = require('next')

const dev = process.env.NODE_ENV !== 'production'
const app = next({ dev })
const handle = app.getRequestHandler()

app.prepare().then(() => {
  const server = new Koa()
  const router = new Router()

  router.get('/a/:id', async (ctx) => {
    const id = ctx.params.id
    await handle(ctx.req, ctx.res, {
      pathname: '/a',
      query: {
        id
      }
    })
  })

  server.use(router.routes())

  server.use(async (ctx, next) => {
    await handle(ctx.req, ctx.res)
    ctx.respond = false
  })

  server.listen(3000, () => {
    console.log('koa server listening on 3000')
  })
})
```

路由变化的钩子
```js
const events = [
  'routeChangeStart',
  'routeChangeComplete',
  'routeChangeError',
  'beforeHistoryChange',
  'hashChangeStart',
  'hashChangeComplete'
]

const makeEvent = (type) => (...args) => {
  console.log(type, ...args)
}

events.forEach(event => {
  Router.events.on(event, makeEvent(event))
})
```

### 获取数据
```js
import { withRouter } from 'next/router'
import Comp from '../components/comp'

const A = ({ router, name }) => <Comp>A {router.query.id} {name}</Comp>

A.getInitialProps = () => {
  return {
    name: 'joker'
  }
}

export default withRouter(A)
```

### 重写App
在`page`下`_app.js`
```js
import App from 'next/app'

class MyApp extends App {
  static async getInitialProps ({ Component }) {
    let pageProps
    if (Component.getInitialProps) {
      pageProps = await Component.getInitialProps()
    }

    return {
      pageProps
    }
  }
  render () {
    const { Component, pageProps } = this.props

    return (
      <Component {...pageProps} />
    )
  }
}

export default MyApp
```

### 设置公用模板Layout

新建`layout.jsx`
```js
import Link from 'next/link'
import { Button } from 'antd'

export default ({ children }) => (
  <>
    <header>
      <Link href="/a">
        <Button>A</Button>
      </Link>
      <Link href="/test/b">
        <Button>Test B</Button>
      </Link>
    </header>
    {children}
  </>
)
```
之后在`_app.js`当做组件使用

### 自定义Document

新建`document.jsx`
