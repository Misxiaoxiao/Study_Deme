// const baseUrl = 'http://222.249.128.80:8083/' // 北京市测试环境
// const baseUrl = 'http://192.168.0.146:8080/' // 山东省测试环境
// const baseUrl = 'http://223.244.84.38:2445/' // 安徽省测试环境
const baseUrl = 'http://192.168.0.121:8080/' // 安徽省测试环境


module.exports = {
  gotoUrl: baseUrl,
  getCookieUrl: baseUrl + 'task/getTaskByType',
  serverUrl: baseUrl
}
