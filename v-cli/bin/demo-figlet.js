const { promisify } = require('util')

const asyncFiglet = promisify(require('figlet'))

// 第一种方式，callback调用
// figlet('Hello World!!', (err, data) => {
//   if (err) {
//     console.log('Something went wrong...')
//     console.log(err)
//     return
//   }
//   console.log(data)
// })

// 第二种方式，异步调用
const fun = async () => {
  let data = await asyncFiglet('Vue 3')
  console.log(data)
}

fun()
