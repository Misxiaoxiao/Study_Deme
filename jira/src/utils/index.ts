import { useEffect, useState } from "react"

export interface CObject extends Object {
  [k: string]: any;
}

export function isFalsy (val: unknown): boolean {
  return val === 0 ? false : !val
}

export function cleanObject (object: CObject) {
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

export function useDebounce<T> (value: T, delay: number = 300) {
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
