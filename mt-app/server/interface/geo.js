import Router from 'koa-router'
import axios from './utils/axios'
import Province from '../dbs/models/province'

let router = new Router({prefix: '/geo'})

// router.get('/getPosition', async (ctx) => {
//   let res = await axios.get('http://pv.sohu.com/cityjson?ie=utf-8')
//   // console.log(res)
//   if (status === 200) {
//     ctx.body = {
//       province,
//       city
//     }
//   } else {
//     ctx.body = {
//       province: '',
//       city: ''
//     }
//   }
// })

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

export default router
