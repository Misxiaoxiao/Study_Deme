const puppeteer = require('puppeteer')
const Server = require('./server')
const config = require('./config')
const nodeServer = new Server()

const options = {
  headless: false,
  slowMo: 250,
  defaultViewport: {
    width: 1000,
    height: 800
  }
}
// 注册浏览器接口拦截器
puppeteer.launch(options).then(async browser => {
  const page = await browser.newPage()
  await page.setRequestInterception(true)
  page.on('request', async interceptedRequest => {
    const cookie = await page.cookies(config.getCookieUrl)
    let cookieStr = ''
    if (cookie) {
      cookie.forEach((item, index) => {
        if (item.name && item.value) {
          cookieStr += `${item.name}=${item.value};`
          if (index !== cookie.length - 1) {
            cookieStr += ' '
          }
        }
      })
    }
    if (cookieStr.indexOf('token') >= 0) {
      nodeServer.start(cookieStr)
    }
    interceptedRequest.continue()
  })
  page.goto(config.gotoUrl)
})
