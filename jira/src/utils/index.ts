import { useEffect, useState } from "react"

export function isFalsy (val: any) {
  return val === 0 ? false : !val
}

export function cleanObject (object: any) {
  const result = {...object}
  Object.keys(result).forEach(key => {
    const value = result[key]
    if (isFalsy(value)) {
      delete result[key]
    }
  })
  return result
}

export function useMount (callback: Function) {
  useEffect(() => {
    callback()
  }, [])
}

export function useDebounce (value: any, delay = 300) {
  const [ debounceValue, setDebounceValue ] = useState(value)
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebounceValue(value)
    }, delay)
    return () => {
      clearTimeout(handler)
    }
  }, [value, delay])
  return debounceValue
}
