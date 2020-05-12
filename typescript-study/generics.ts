function echo<T>(arg: T): T {
  return arg
}

const str: string = 'str'
const result = echo(str)

function swap<T, U> (tuple: [T, U]): [U, T] {
  return [tuple[1], tuple[0]]
}
const result1 = swap(['string', 123])

function echoWithArr<T>(arg: T[]): T[] {
  console.log(arg.length)
  return arg
}
const arrs = echo([1, 2, 3])

interface IWithLength {
  length: number
}

function echoWithLength<T extends IWithLength> (arg: T): T {
  console.log(arg.length)
  return arg
}
const str1 = echoWithLength('str')
const obj = echoWithLength({ length: 10 })
const arr1 = echoWithLength([1, 2, 3])

class Queue<T> {
  private data = []
  push(item: T) {
    return this.data.push(item)
  }
  pop(): T {
    return this.data.pop()
  }
}

const queue = new Queue<number>()
queue.push(1)
console.log(queue.pop().toFixed())

const queue1 = new Queue<string>()
queue1.push('str')
console.log(queue1.pop().length)

interface IKeyPair<T, U> {
  key: T,
  value: U
}
let kp1: IKeyPair<number, string> = { key: 1, value: 'str1' }
let kp2: IKeyPair<string, number> = { key: 'str2', value: 2 }

interface IPlus<T> {
  (a: T, b: T): T
}
function plus(a: number, b: number): number {
  return a + b
}
function connect(a: string, b: string): string {
  return a + b
}
const a: IPlus<number> = plus
const b: IPlus<string> = connect