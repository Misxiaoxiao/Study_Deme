const express = require('express')
const proxyMiddleware = require('http-proxy-middleware')
const config = require('./config')
let hasServer = false

class Server {
  constructor(options) {
    this.options = options
  }
  start(cookie) {
    if (hasServer) return
    const app = express()
    hasServer = true
    const proxy = proxyMiddleware.createProxyMiddleware
    // 设置允许跨域请求
    app.all('*', function (_, res, next) {
      res.header('Access-Control-Allow-Origin', '*') // 访问控制允许来源：所有
      res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept') // 访问控制允许报头 X-Requested-With: xhr请求
      res.header('Access-Control-Allow-Metheds', 'PUT, POST, GET, DELETE, OPTIONS') // 访问控制允许方法
      res.header('X-Powered-By', 'nodejs') // 自定义头信息，表示服务端用nodejs
      res.header('Content-Type', 'application/json;charset=utf-8')
      next()
    })
    // 一般请求
    // app.use('/', proxy({ target: 'http://127.0.0.1:8080', changeOrigin: true }))
    // 携带Cookie信息，绕过登录验证（接口需要登录验证）
    app.use('/', proxy({
      target: config.serverUrl,
      changeOrigin: true,
      onProxyReq (proxyReq) {
        proxyReq.setHeader('Cookie', cookie)
      }
    }))
    app.listen('3000', function () {
      console.log('启动代理服务器 http://127.0.0.1:3000')
    })
  }
}

module.exports = Server
