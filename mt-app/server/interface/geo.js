import Router from 'koa-router'
import Province from '../dbs/models/province'
import Menu from '../dbs/models/menu'
import City from '../dbs/models/city'

let router = new Router({prefix: '/geo'})

router.get('/city', async (ctx) => {
  let city = []
  const result = await City.find()
  result.forEach(item => {
    city = city.concat(item.value)
  })

  ctx.body = {
    code: 0,
    city: city.map(item => {
      return {
        province: item.province,
        id: item.id,
        name: item.name === '市辖区' || item.name === '省直辖县级行政区划'
          ? item.province
          : item.name
      }
    })
  }
})

router.get('/province', async (ctx) => {
  let province = await Province.find()

  ctx.body = {
    province: province.map(item => {
      return {
        id: item.id,
        name: item.value[0]
      }
    })
  }
})

router.get('/menu', async (ctx) => {
  const result = await Menu.findOne()
  ctx.body = {
    menu: result ? result.menu : []
  }
})

router.get('/hotCity', async (ctx) => {
  const list = [
    '北京市',
    '上海市',
    '广州市',
    '深圳市',
    '天津市',
    '西安市',
    '杭州市',
    '南京市',
    '武汉市',
    '成都市'
  ]

  const result = await City.find()
  let nList = []
  result.forEach(item => {
    nList = nList.concat(item.value.filter(k => list.includes(k.name) || list.includes(k.province)))
  })
  ctx.body = {
    code: 0,
    hots: nList
  }
})

export default router
