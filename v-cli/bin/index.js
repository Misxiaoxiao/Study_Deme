/**
 * 开发后台脚手架，快速生成标准Vue后台架构
 */
const { program } = require('commander')
const { promisify } = require('util')
const asyncFiglet = promisify(require('figlet'))
const chalk = require('chalk')
const inquirer = require('inquirer')
const init = require('./init')

// 设置版本和参数
program.version('1.0.0')
program.option('-n -- name <type>', 'output name')

// 日志打印函数
const log = content => console.log(chalk.yellow(content))

// 打印Logo
const printLogo = async () => {
  const data = await asyncFiglet('v-cli')
  log(data)
}

program.command('create <app-name>')
  .description('创建Vue项目')
  .action(async (name) => {
    await printLogo()
    log('准备创建项目...')
    const answer = await inquirer.prompt([
      {
        name: 'language',
        type: 'list',
        message: '请选择语言版本',
        choices: ['Javascript', 'Typescript']
      }
    ])
    if (answer.language === 'Javascript') {
      // 下载框架
      log('您选择了Javascript版本，即将下载')
      init(name)
    } else {
      log('暂无当前版本，敬请期待！')
    }
  })

// 参数解析
program.parse(process.argv)
