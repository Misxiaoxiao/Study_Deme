import { useEffect, useState, useRef } from 'react'

export interface CObject extends Object {
  [k: string]: any;
}

export function isFalsy (val: unknown): boolean {
  return val === 0 ? false : !val
}

export function isVoid (value: unknown): boolean {
  return value === undefined || value === null || value === ''
}

export function cleanObject (object: CObject) {
  const result = {...object}
  Object.keys(result).forEach(key => {
    const value = result[key]
    if (isVoid(value)) {
      delete result[key]
    }
  })
  return result
}

export function useMount (callback: Function) {
  useEffect(() => {
    callback()
    // eslint-disable-next-line react-hooks/exhaustive-deps
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

export const resetRoute = () => window.location.href = window.location.origin

// 返回组件的挂载状态，如果还没挂载或者已经卸载，返回false，反之，返回true
export const useMountedRef = () => {
  const mountedRef = useRef(false)

  useEffect(() => {
    mountedRef.current = true
    return () => {
      mountedRef.current = false
    }
  })

  return mountedRef
}
