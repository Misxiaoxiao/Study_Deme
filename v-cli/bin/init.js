const { promisify } = require('util')
const orag = require('ora')
const download = promisify(require('download-git-repo'))
const chalk = require('chalk')
const shell = require('shelljs')

// 日志打印函数
const log = content => console.log(chalk.yellow(content))

module.exports = async (appName) => {
  log(`🚀  创建项目 ${appName}`)
  shell.rm('-rf', appName)
  const sppiner = orag('下载中...').start()
  try {
    await download('https://github.com/Misxiaoxiao/MVVM.git', appName, { clone: true })
    sppiner.succeed('下载完成')
    log(`
      下载完成，请执行下面命令启动项目：
      =============================
      cd ${appName}
      npm install | yarn
      npm run dev
      or
      yarn dev
    `)
  } catch (err) {
    log('下载失败', err)
    sppiner.stop()
  }
}
