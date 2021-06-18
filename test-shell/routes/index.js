const router = require('koa-router')()
const shell = require('shelljs');
const clone = require('git-clone')

router.get('/', async (ctx, next) => {
  await ctx.render('index', {
    title: 'Hello Koa 2!'
  })
})

router.get('/shell', async (ctx, next) => {
  let lib = `
    rm -rf build_lib
    mkdir build_lib
    cd ./build_lib
    git clone http://223.70.245.64:8888/ruanzongqi/datacenter2.0.git
    cd datacenter2.0
    npm i
    npm run build
  `
  const result = await shell.exec(lib)
  ctx.body = result
})
router.get('/clone', async (ctx, next) => {
  clone('http://223.70.245.64:8888/ruanzongqi/datacenter2.0.git', './', {}, (err) => {
    console.log(err)
  })
  ctx.body = result
})

router.get('/json', async (ctx, next) => {
  ctx.body = {
    title: 'koa2 json'
  }
})

module.exports = router
