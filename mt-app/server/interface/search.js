import Router from 'koa-router'
import axios from './utils/axios'

const sign = 'abcd'

let router = new Router({prefix: '/search'})

router.get('/top', async (ctx) => {
  try {
    let top = await Poi.find({
      name: new RegExp(ctx.query.input),
      city: ctx.query.city
    })

    ctx.body = {
      code: 0,
      top: top.map(item => {
        return {
          name: item.name,
          type: item.type
        }
      }),
      type: top.length ? top[0].type : ''
    }
  } catch (e) {
    ctx.body = {
      code: -1,
      top: []
    }
  }
})

router.get('hotPlace', async (ctx) => {
  let city = ctx.store ? ctx.store.geo.position.city : ctx.query.city
  try {
    let result = await Poi.find({
      city,
      type: ctx.query.type || '景点'
    }).limit(10)

    ctx.body = {
      code: 0,
      result: result.map(item => {
        return {
          name: item.name,
          type: item.type
        }
      })
    }
  } catch (e) {
    ctx.body = {
      code: -1,
      result: []
    }
  }
})

router.get('/getScenesList', async (ctx) => {
  const { tab } = ctx.query
  let {
    status,
    data
  } = await axios.get('https://bj.meituan.com/ptapi/getScenesList', {
    params: {
      theme: 'quality',
      tab,
      ci: 1,
      limit: 10,
    }
  })
  ctx.body = {
    code: 0,
    data: status === 200 ? data : {}
  }
})

router.get('/products', async (ctx) => {
  const keyword = ctx.query.keyword || '旅游'
  const city = ctx.query.city || '北京'
  const {
    status,
    data: {
      product,
      more
    }
  } = await axios.get('', {
    params: {
      keyword,
      city,
      sign
    }
  })
  if (status === 200) {
    ctx.body = {
      product,
      more: ctx.isAuthenticated() ? more : [],
      login: ctx.isAuthenticated()
    }
  } else {
    ctx.bodu = {
      product: {},
      more: ctx.isAuthenticated() ? more : [],
      login: ctx.isAuthenticated()
    }
  }
})

export default router
