const { program } = require('commander')
program.version('0.0.1')

program.option('-n ', '输入名称')
program.option('-t --type <type>', '项目类型')

const options = program.opts()

console.log('opts =>', options)

program
  .command('create <app-name>')
  .description('创建一个标准的Vue项目')
  .action(name => {
    console.log(`正在创建${name}项目`)
  })

program.parse(process.argv)
