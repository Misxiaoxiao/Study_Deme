const mongoose = require('mongoose')

const userSchema = mongoose.Schema({
  userId: Number,
  userName: String,
  userPwd: String,
  userEmail: String,
  mobile: String,
  sex: Number,
  deptId: [],
  job: String,
  state: {
    type: Number,
    default: 1
  },
  role: {
    type: Number,
    default: 1
  },
  roleList: [],
  createTime: {
    type: Date,
    default: Date.now()
  },
  lastLoginTime: {
    type: Date,
    default: Date.now()
  },
  remark: String
})

module.exports = mongoose.model('users', userSchema, 'users')
