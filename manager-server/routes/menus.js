const router = require('koa-router')()
const util = require('../utils/util')
const Menu = require('../models/menuSchema')

// 菜单列表查询
router.get('/list', async ctx => {
  const { menuName, menuState } = ctx.request.query
  let params = {}
  if (menuName) params.menuName = menuName
  if (menuState) params.menuState = menuState
  let rootList = await Menu.find(params) || []
  const permissionList = util.getTreeMenu(rootList, null, [])
  ctx.body = util.success(permissionList)
})
// 菜单编辑、删除、新增功能
router.post('/operate', async ctx => {
  const { _id, action, ...params } = ctx.request.body
  let res, info;
  try {
    if (action === 'add') {
      res = await Menu.create(params)
      info = '创建成功'
    } else if (action === 'edit') {
      params.updateTime = new Date()
      res = await Menu.findByIdAndUpdate(_id, params)
      info = '编辑成功'
    } else if (action === 'delete') {
      res = await Menu.findByIdAndUpdate(_id)
      await Menu.deleteMany({ parentId: { $all: [_id] } })
      info = '删除成功'
    } else {
      util.fail('action 参数的类型只能为 add edit delete')
    }
  } catch (error) {
    ctx.body = util.fail(error.stack)
  }
})

module.exports = router
