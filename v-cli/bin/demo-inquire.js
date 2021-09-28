const { program } = require('commander')
const inquirer = require('inquirer')
program.version('0.0.1')

program.option('-n ', '输入名称')
program.option('-t --type <type>', '项目类型')

inquirer.prompt([
  {
    name: 'userName',
    type: 'input',
    message: '你的名字叫啥？'
  },
  {
    name: 'age',
    type: 'checkbox',
    message: 'how old are you?',
    choices: ['why not me?', 'yes, is me', 'i am 10']
  }, {
    name: 'size',
    type: 'list',
    message: 'what is your size',
    choices: ['10cm', '20cm', '30cm']
  }
]).then(answer => {
  console.log("回答内容：", answer)
})

program.parse(process.argv)
