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

```js
import Document, { Html, Head, NextScript, Main } from 'next/document'

class MyDocument extends Document {
  static async getInitialProps(ctx) {
    const props = await Document.getInitialProps(ctx)

    return {
      ...props
    }
  }

  render () {
    return (
      <Html>
        <Head />
        <body className="test">
          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }
}

export default MyDocument
```
新版中的`title`需要在`_page`中设置，因此修改
```js
import App from 'next/app'
import Head from 'next/head'
import Layout from '../components/layout'

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
      <>
        <Head>
          <title>My App</title>
          <style jsx>{`.test { color: red; }`}</style>
        </Head>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </>
    )
  }
}

export default MyApp
```

### 集成styled Component

`npm install styled-components babel-plugin-styled-components`,
修改`.babelrc`
```js
{
  "presets": ["next/babel"],
  "plugins": [
    [
      "import",
      {
        "libraryName": "antd",
        "style": "css"
      }
    ],
    [
      "styled-components",
      {
        "ssr": true
      }
    ]
  ]
}
```

### 异步模块加载

异步加载`moment`
```js
import { withRouter } from 'next/router'
import Comp from '../components/comp'
import styled from 'styled-components'

const Title = styled.h1`
  color: yellow;
  font-size: 40px;
`

const A = ({ router, name }) => (
  <>
    <Title>Title {}</Title>
    <Comp>{router.query.id} {name}</Comp>
  </>
)

A.getInitialProps = async (ctx) => {
  const moment = await import('moment')

  return {
    name: 'joker',
    time: moment.default(Date.now() - 60 * 1000).fromNow
  }
}

export default withRouter(A)
```

异步组件加载
```js
import dynamic from 'next/dynamic'

const Comp = dynamic(import('../components/comp'))
```

### next配置
```js
const withCss = require('@zeit/next-css')

// 配置说明
const configs = {
    // 编译文件的输出目录
    distDir: 'build',
    // 是否给每个路由生成Etag
    // Etag是用来做缓存验证的，如果路由执行的时候，新的Etag是相同的，那么就会复用当前内容，而无需重新渲染
    // 默认情况下，nextJS是会对每个路由生成Etag的。但是如果我们部署的时候，ngx已经做了Etag的配置，那么就可以关闭nextJS的Etag，节省性能
    generateEtags: true,
    // （不常用）页面内容缓存配置，只针对开发环境
    onDemandEntries: {
        // 内容在内存中缓存的时长（ms）
        maxInactiveAge: 25 * 1000,
        // 最多同时缓存多少个页面
        pagesBufferLength: 2,
    },
    // 在pages目录下那种后缀的文件会被认为是页面
    pageExtensions: ['jsx', 'js'],
    // （不常用）配置buildId，一般用于同一个项目部署多个节点的时候用到
    generateBuildId: async () => {
        if (process.env.YOUR_BUILD_ID) {
        return process.env.YOUR_BUILD_ID
        }

        // 返回null，使用nextJS默认的unique id
        return null
    },
    // （重要配置）手动修改webpack config
    webpack(config, options) {
        return config
    },
    // （重要配置）修改webpackDevMiddleware配置
    webpackDevMiddleware: config => {
        return config
    },
    // （重要配置）可以在页面上通过 procsess.env.customKey 获取 value。跟webpack.DefinePlugin实现的一致
    env: {
        customKey: 'value',
    },
    // 下面两个要通过 'next/config' 来读取
    // 只有在服务端渲染时才会获取的配置
    serverRuntimeConfig: {
        mySecret: 'secret',
        secondSecret: process.env.SECOND_SECRET,
    },
    // 在服务端渲染和客户端渲染都可获取的配置
    publicRuntimeConfig: {
        staticFolder: '/static',
    },
    // 上面这两个配置在组件里使用方式如下：
    // import getCofnig from 'next/config'
    // const { serverRuntimeConfig,publicRuntimeConfig } = getCofnig()
    // console.log( serverRuntimeConfig,publicRuntimeConfig )
}

if (typeof require !== 'undefined') {
    require.extensions['.css'] = file => { }
}

// 虽然next-css看起来是一个处理样式的插件，实则它是接收的一个对象，可以把传入的其他非css相关的webpack配置一并处理。
// 建议不要直接写一个新的webpack配置，因为next-css里面的webpack的配置是非常全面的，如果被覆盖了，可能会导致报错。
module.exports = withCss({
    distDir: 'build'                                                // 这里配置了之后才会生效
})
```

# Hooks

让函数组件具有类组件的能力

```js
import React, {useState, useEffect} from 'react'
// 传统组件
class MyCount extends React.Component {
  state = {
    count: 0
  }

  componentDidMount () {
    this.interval = setInterval(() => {
      this.setState({ count: this.state.count + 1 })
    }, 1000);
  }

  componentWillUnmount () {
    if (this.interval) {
      clearInterval(this.interval)
    }
  }

  render () {
    return <span>{this.state.count}</span>
  }
}
// hooks组件
function MyCountFunc () {
  const [count, setCount] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setCount(count => count + 1)
    }, 1000);
    return () => clearInterval(interval)
  }, [])

  return <span>{count}</span>
}

export default MyCountFunc
```

## State Hooks
```js
// useState
useState(0)
useState(n => n + 1)

// useReducer
import { useReducer, useEffect } from 'react'

function countReducer(state, action) {
  switch (action.type) {
    case 'add':
      return state + 1
    case 'minus':
      return state - 1
    default:
      return state
  }
}

function MyCountFunc () {
  const [ count, dispatchCount ] = useReducer(countReducer, 0)

  // 更新到页面上的时候进行执行
  useEffect(() => {
    const interval = setInterval(() => {
      dispatchCount({ type: 'minus' })
    }, 1000);
    return () => clearInterval(interval)
  }, [])
  
  // 没有更新到页面上的时候进行执行
  useLayoutEffect(() => {
    console.log('layout effect invoked')
    return () => console.log('layout effect deteched')
  }, [name])

  return <span>{count}</span>
}

export default MyCountFunc
```

### useContext
在`lib`文件夹下新建`my-content.js`文件
```js
import React from 'react'

export default React.createContext('')
```
组件中使用
```js
import App from 'next/app'
import Head from 'next/head'
import Layout from '../components/layout'

import MyContext from '../lib/my-content'

class MyApp extends App {
  state = {
    context: 'joker'
  }

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
      <>
        <Head>
          <title>My App</title>
          <style>{`.test { color: red; }`}</style>
        </Head>
        <Layout>
          <MyContext.Provider value={this.state.context}>
            <Component {...pageProps} />
          </MyContext.Provider>
          <button onClick={() => this.setState({ context: `${this.state.context}1` })}>update context</button>
        </Layout>
      </>
    )
  }
}

export default MyApp
```
子组件中
```js
import React, {useState, useReducer, useEffect, useContext, useLayoutEffect} from 'react'
import MyContext from '../../lib/my-content'

function MyCountFunc () {
  // const [count, setCount] = useState(0)
  const [ count, dispatchCount ] = useReducer(countReducer, 0)
  const [ name, setName ] = useState('joker')
  const context = useContext(MyContext)

  // useEffect(() => {
  //   const interval = setInterval(() => {
  //     // setCount(count => count + 1)
  //     dispatchCount({ type: 'minus' })
  //   }, 1000);
  //   return () => clearInterval(interval)
  // }, [])

  useEffect(() => {
    console.log('effect invoked')
    return () => console.log('effect deteched')
  }, [name])

  useLayoutEffect(() => {
    console.log('layout effect invoked')
    return () => console.log('layout effect deteched')
  }, [name])

  return <div>
    <input value={name} onChange={(e) => {setName(e.target.value)}} />
    <button onClick={() => dispatchCount({ type: 'add' })}>{count}</button>
    <p>{context}</p>
  </div>
}

export default MyCountFunc
```

### useRef

```js
import React, {useState, useReducer, useEffect, useContext, useRef} from 'react'

function MyCountFunc () {
  const [ count, dispatchCount ] = useReducer(countReducer, 0)
  const [ name, setName ] = useState('joker')
  const context = useContext(MyContext)
  const inputRef = useRef()

  useEffect(() => {
    console.log('effect invoked')
    console.log(inputRef)
    return () => console.log('effect deteched')
  }, [name])

  return <div>
    <input ref={inputRef} value={name} onChange={(e) => {setName(e.target.value)}} />
    <button onClick={() => dispatchCount({ type: 'add' })}>{count}</button>
    <p>{context}</p>
  </div>
}

export default MyCountFunc
```

### Hooks 渲染优化
```js
import { useReducer, useState, memo, useMemo, useCallback } from 'react'

function countReducer(state, action) {
  switch (action.type) {
    case 'add':
      return state + 1
    case 'minus':
      return state - 1
    default:
      return state
  }
}

function MyCountFunc () {
  const [ count, dispatchCount ] = useReducer(countReducer, 0)
  const [ name, setName ] = useState('joker')

  const config = useMemo(
    () => ({
      text: `count is ${count}`,
      color: count > 3 ? 'red' : 'blue'
    }),
    [count]
  )

  const handleButtonClick = useCallback(
    () => dispatchCount({ type: 'add' }),
    []
  )

  return (
    <div>
      <input value={name} onChange={e => setName(e.target.value)} />
      <Child
        config={config}
        onButtonClick={handleButtonClick}
      />
    </div>
  )
}

const Child = memo(({ onButtonClick, config }) => {
  console.log('child render')
  return (
    <button onClick={onButtonClick} style={{ color: config.color }}>
      {config.text}
    </button>
  )
})

export default MyCountFunc
```

## 引入Redux

`npm install redux redux-thunk`
在`store`文件夹下的`store.js`
```js
import { createStore, combineReducers, applyMiddleware } from 'redux'
import ReduxThunk from 'redux-thunk'

const countState = {
  count: 0
}

const userState = {
  username: ''
}

const ADD = 'ADD'
function countReducer(state = countState, action) {
  switch (action.type) {
    case ADD:
      return { count: state.count + (action.num || 1) }
    default:
      return state
  }
}

const UPDATE_USERNAME = 'UPDATE_USERNAME'
function userReducer(state = userReducer, action) {
  switch (action.type) {
    case UPDATE_USERNAME:
      return {
        ...state,
        username: action.username
      }
    default:
      return state
  }
}

const allReducer = combineReducers({
  count: countReducer,
  user: userReducer
})

const store = createStore(
  allReducer,
  {
    count: countState,
    user: userState
  },
  applyMiddleware(ReduxThunk)
)

function add(num) {
  return {
    type: 'ADD',
    num
  }
}

function asyncAdd(num) {
  return dispatch => {
    setTimeout(() => {
      dispatch(add(num))
    }, 3000);
  }
}

store.dispatch(add(3))
console.log(store.getState())
store.dispatch({ type: ADD })
store.dispatch({ type: UPDATE_USERNAME, username: 'joker' })
store.dispatch(asyncAdd(5))
store.subscribe(() => {
  console.log(store.getState(), 'change')
})

export default store
```

### redux 连接组件
`npm install react-redux`
在`_app.js`中
```js
import { Provider } from 'react-redux'
// 之后在render方法中包裹组件
  render () {
    const { Component, pageProps } = this.props

    return (
      <>
        <Head>
          <title>My App</title>
          <style>{`.test { color: red; }`}</style>
        </Head>
        <Layout>
          <MyContext.Provider value={this.state.context}>
            <Provider store={store}>
              <Component {...pageProps} />
            </Provider>
          </MyContext.Provider>
        </Layout>
      </>
    )
  }
```
之后在`index.jsx`中使用
```js
import { connect } from 'react-redux'

const Index = ({ count, username, add, rename }) => {

  return (
    <>
      <span>count: {count}</span>
      <span>username: {username}</span>
      <input value={username} onChange={e => {rename(e.target.value)}} />
      <button onClick={() => add(count)}>ADD</button>
    </>
  )
}

export default connect(
  function mapStateToProps(state) {
    return {
      count: state.count.count,
      username: state.user.username
    }
  },
  function mapActionToProps(dispatch) {
    return {
      add: num => dispatch({ type: 'ADD', num }),
      rename: name => dispatch({ type: 'UPDATE_USERNAME', name })
    }
  }
)(Index)
```

### redux 连接 next
在`lib`下新建一个`with-redux.js`用来处理next使用redux时造成client和server时store数据不统一的问题，其功能是作为`_aap.js`的高阶组件创建一个store
```js
import React from 'react'

const isServer = typeof window === 'underfined'
const __NEXT_REDUX_STORE__ = '__NEXT_REDUX_STORE__'

function getHocCreateStore (initialState) {
  if (isServer) {
    return createStore(initialState)
  }
  if (!window[__NEXT_REDUX_STORE__]) {
    window[__NEXT_REDUX_STORE__] = createStore(initialState)
  }
  return window[__NEXT_REDUX_STORE__]
}

export default Comp => {
  class WithReduxApp extends React.Component {
    constructor (props) {
      super(props)
      this.reduxStore = getHocCreateStore(props.initialReduxState)
    }

    render () {
      const { Component, pageProps, ...rest } = this.props

      return <Comp Component={Component} pageProps={pageProps} {...rest} reduxStore={this.reduxStore} />
    }
  }

  WithReduxApp.getInitialProps = async (ctx) => {
    const reduxStore = getHocCreateStore()

    ctx.reduxStore = reduxStore

    let appProps = {}
    if (typeof Comp.getInitialProps === 'function') {
      appProps = await Comp.getInitialProps(ctx)
    }

    return {
      ...appProps,
      initialReduxState: reduxStore.getState()
    }
  }

  return WithReduxApp
}
```
完成`with-redux`组件后修改`_app.jsx`组件
```js
import App from 'next/app'
import { Provider } from 'react-redux'
import withRedux from '../lib/with-redux'

class MyApp extends App {
  static async geiInitialProps (ctx) {
    const { Component } = ctx
    let pageProps
    if (Component.getInitialProps) {
      pageProps = await Component.getInitialProps(ctx)
    }

    return {
      pageProps
    }
  }
  
  render () {
    const { Component, pageProps, reduxStore } = this.props

    return (
      <Provider store={reduxStore}>
        <Component {...pageProps} />
      </Provider>
    )
  }
}

export default withRedux(MyApp)
```

### 使用 rollup 打包 js vue 等文件


新建项目文件，使用 `npm init -y` 初始化项目，之后安装使用 `npm i -D rollup` 命令安装 `rollup`

新建文件 `rollup.config.js` 文件用来配置 `rollup` 的配置

安装下列 `rollup-plugin-babel` 第三方代码引入 `rollup-plugin-commonjs` 处理commonjs规范 `rollup-plugin-json` 处理 json 文件 `rollup-plugin-node-resolve` 处理代码规范 `rollup-plugin-postcss` `sass` 样式 `rollup-plugin-terser` 代码压缩 插件等
```js
// rollup.config.js
const path = require('path')
const resolve = require('rollup-plugin-node-resolve')
const commonjs = require('rollup-plugin-commonjs')
const babel = require('rollup-plugin-babel')
const json = require('rollup-plugin-json')
const { terser } = require('rollup-plugin-terser')
const vue = require('rollup-plugin-vue')
const postcss = require('rollup-plugin-postcss')

const inputPath = path.resolve(__dirname, './src/index.js')
const outputUMDPath = path.resolve(__dirname, './dist/datav.min.js')
const outputESPath = path.resolve(__dirname, './dist/datav.es.min.js')

module.exports = {
  input: inputPath, // 入口地址
  output: [{ // 打包出口地址
    file: outputUMDPath,
    format: 'umd',
    name: 'datav',
    globals: {
      vue: 'vue'
    }
  }, {
    file: outputESPath,
    format: 'es',
    name: 'datav',
    globals: {
      vue: 'vue'
    }
  }],
  plugins: [
    resolve(),
    vue(),
    commonjs(),
    json(),
    postcss(),
    terser(),
    babel({
      exclude: 'node_modules/**'
    })
  ],
  external: ['vue']
}
```

新建 `src` 文件夹，文件夹下新建测试文件 `index.js` 和 `Test.vue` 等
```js
// index.js
import Test from './Test.vue'

export default function (Vue) {
  Vue.component(Test.name, Test)
}
```
```js
// Test.vue
<template>
  <div class="test">
    {{message}}
    <div>count: {{count}}</div>
    <div>doubleCount: {{doubleCount}}</div>
  </div>  
</template>

<script>
import { computed, ref } from 'vue'

export default {
  name: 'TestCom',
  setup() {
    const message = 'test component'
    const count = ref(1)
    const doubleCount = computed(() => count.value * 2)
    return {
      message,
      count,
      doubleCount
    }
  }
}
</script>

<style lang="scss">
.test {
  color: red;
}
</style>
```

修改 `package.json` 文件，添加 `"dev": "rollup -wc rollup.config.js"` 命令
`w` 表示 监听

### 关联组件库
`package.json` 文件修改 `main` 字段表示上传到npm之后导出的主体文件，`files` 字段上传到npm之后所包含的文件

在组件库文件夹下使用命令 `npm link`，在项目需要使用的文件夹下使用命令 `npm link 组件库名称`，并在 `package.json` 下添加相关依赖即可，真实上线需要将组件库进行发布npm

### 组件库 esLint 使用
在组件库项目文件下使用命令 `npm i -D eslint` 进行安装 `eslint` 之后使用 `./node_modules/.bin/eslint --init` 初始化 `eslint` 相关配置

### 按需加载
直接引入组件相关的js文件
