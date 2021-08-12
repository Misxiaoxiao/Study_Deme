const Koa = require('koa')
const app = new Koa()
const views = require('koa-views')
const json = require('koa-json')
const onerror = require('koa-onerror')
const bodyparser = require('koa-bodyparser')
// const logger = require('koa-logger')
const log4js = require('./utils/log4')
const router = require('koa-router')()
const koajwt = require('koa-jwt')
const util = require('./utils/util')

const users = require('./routes/users')
const menus = require('./routes/menus')
const roles = require('./routes/roles')

// error handler
onerror(app)

require('./config/db')

// middlewares
app.use(bodyparser({
  enableTypes:['json', 'form', 'text']
}))
app.use(json())
// app.use(logger())
app.use(require('koa-static')(__dirname + '/public'))

app.use(views(__dirname + '/views', {
  extension: 'pug'
}))

// logger
app.use(async (ctx, next) => {
  log4js.info(`get params: ${JSON.stringify(ctx.request.query)}`)
  log4js.info(`post params: ${JSON.stringify(ctx.request.body)}`)
  await next().catch(error => {
    if (error.status == '401') {
      ctx.status = 200
      ctx.body = util.fail('Token 认证失败', util.CODE.AUTH_ERROR)
    } else {
      throw error
    }
  })
})

app.use(koajwt({ secret: 'manager' }).unless({
  path: [/^\/api\/users\/login/]
}))
router.prefix('/api')

router.use(users.routes(), users.allowedMethods())
router.use(menus.routes(), menus.allowedMethods())
router.use(roles.routes(), menus.allowedMethods())

app.use(router.routes(), router.allowedMethods())

// error-handling
app.on('error', (err, ctx) => {
  console.error('server error', err, ctx)
  log4js.error('error message')
});

module.exports = app
