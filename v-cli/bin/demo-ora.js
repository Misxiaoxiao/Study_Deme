const ora = require('ora')

const spinner = ora('loading ...').start()

setTimeout(() => {
  spinner.color = 'yellow'
  spinner.text = 'loading success'
  setTimeout(() => {
    spinner.stop()
  }, 1000)
}, 2000)
