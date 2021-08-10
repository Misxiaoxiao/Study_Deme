/**
 * 用户管理模块
 */
const router = require('koa-router')()
const User = require('../models/userSchema')
const Counter = require('../models/counterSchema')
const util = require('../utils/util')
const jwt = require('jsonwebtoken')
const md5 = require('md5')

router.prefix('/users')

// 用户登录
router.post('/login', async (ctx) => {
  try {
    const { userName, userPwd } = ctx.request.body

    /**
     * 返回数据库指定字段，有三种方式
     * 1. 'userId userName userEmail state role deptId roleList' 通过字符串空格
     * 2. { userId: 1 } 1 表示返回 0 表示不返回（）
     * 3. select('userId')
     */
    const res = await User.findOne({
      userName, userPwd
    }, 'userId userName userEmail state role deptId roleList')
    const data = res._doc
    


    const token = jwt.sign({
      data
    }, 'manager', { expiresIn: '1h' })

    if (res) {
      data.token = token
      ctx.body = util.success(data)
    } else {
      ctx.body = util.fail('账号或密码不正确')
    }
  } catch (error) {
    ctx.body = util.fail(error.msg)
  }
})

router.get('/list', async (ctx) => {
  const { userId, userName, state } = ctx.request.query
  const { page, skipIndex } = util.pager(ctx.request.query)

  let params = {}

  if (userId) params.userId = userId
  if (userName) params.userName = userName
  if (state && state != '0') params.state = state
  try {
    // 根据条件查询所有用户列表
    const query = User.find(params, { _id: 0, userPwd: 0 })
    const list = await query.skip(skipIndex).limit(page.pageSize)
    const total = await User.countDocuments(params)

    ctx.body = util.success({
      page: {
        ...page,
        total
      },
      list
    })
  } catch (error) {
    ctx.body = util.fail(`查询异常:${error.stack}`)
  }
})

// 用户删除/批量删除
router.post('/delete', async (ctx) => {
  // 待删除的用户id数组
  const { userIds } = ctx.request.body
  let res = await User.updateMany({ userId: { $in: userIds } }, { state: 2 })
  if (res.nModified) {
    ctx.body = util.success(res, `共删除成功${res.nModified}条`)
    return
  }
  ctx.body = util.fail('删除失败')
})

// 用户新增/编辑
router.post('/operate', async (ctx) => {
  const {
    userId,
    userName,
    userEmail,
    mobile,
    job,
    state,
    roleList,
    deptId,
    action
  } = ctx.request.body

  if (action === 'add') {
    if (!userName || !userEmail || !deptId) {
      ctx.body = util.fail('参数错误', util.CODE.PARAM_ERROR)
      return
    }
    const res = await User.findOne(
      { $or: [{ userName }, { userEmail }] },
      '_id userName userEmail'
    )
    console.log(res)
    if (res) {
      ctx.body = util.fail(`系统检测到有重复的用户，信息如下：${res.userName} - ${res.userEmail}`)
    } else {
      const doc = await Counter.findOneAndUpdate(
        { _id: 'userId' },
        { $inc: { sequence_value: 1 } },
        { new: true }
      )
      try {
        const user = new User({
          userId: doc.sequence_value,
          userName,
          userEmail,
          role: 1,
          roleList,
          job,
          state,
          deptId,
          mobile,
          userPwd: md5('123456')
        })
        user.save()
        ctx.body = util.success({}, '用户创建成功')
      } catch (error) {
        ctx.body = util.fail(error.stack, '用户创建失败')
      }
    }
  } else {
    if (!deptId) {
      ctx.body = util.fail('部门不能为空', util.CODE.PARAM_ERROR)
      return
    }
    const res = await User.findOneAndUpdate(
      { userId },
      { job, state, roleList, deptId, mobile }
    )
    try {
      ctx.body = util.success({}, '更新成功')
    } catch (error) {
      ctx.body = util.fail(res, '更新失败')
    }
  }
})

module.exports = router
