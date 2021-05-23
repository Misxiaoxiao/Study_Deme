import React, { useState, useEffect } from 'react'

const Test1: React.FC = () => {
  const [num, setNum] = useState<string>('1')
  const [num2, setNum2] = useState<string>('2')
  const changeNum = (val: string) => {
    setNum(val)
  }

  useEffect(() => {
    let timer: any
    document.title = num + num2
    timer = setInterval(() => {
      setNum(n => String(+n + 1))
    }, 1000)
    return () => {
      timer && clearInterval(timer)
    } 
  }, [])

  return (
    <>
      <div>num: {num}</div>
      <input value={num} onChange={e => { setNum(e.target.value) }} />
      <div>num2: {num2}</div>
      <input value={num2} onChange={e => { setNum2(e.target.value) }} />
    </>
  )
}

export default Test1
