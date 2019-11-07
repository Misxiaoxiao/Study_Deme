export default {
  dbs: 'mongodb://127.0.0.1:27017/student',
  redis: {
    get host () {
      return '127.0.0.1'
    },
    get port () {
      return 6379
    }
  },
  smtp: {
    get host () {
      return 'smtp.qq.com'
    },
    get port () {
      return 587
    },
    get user () {
      return '1102820661@qq.com'
    },
    get pass () {
      return 'osvznwqsaokngfbg'
    }
  },
  // 生成4位验证码
  get code () {
    return () => {
      return Math.random.toString(16).slice(2, 6).toUpperCase()
    }
  },
  // 设置过期时间
  get expire () {
    return () => {
      return new Date().getTime() + 60 * 60 * 1000
    }
  }
}