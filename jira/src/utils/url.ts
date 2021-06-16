import { useMemo } from 'react'
import { useSearchParams } from 'react-router-dom'
import type { URLSearchParamsInit } from 'react-router-dom'
import { cleanObject } from 'utils'

// 返回页面 url 中，制定键的参数值
export const useUrlQueryParam = <K extends string>(keys: K[]) => {
  const [searchParams, setSearchParams] = useSearchParams()
  return [
    useMemo(
      () => keys.reduce((prev, key) => {
        return {
          ...prev,
          [key]: (searchParams.get(key) || '')
        }
      }, {} as { [key in K]: string }),
      // eslint-disable-next-line react-hooks/exhaustive-deps
      [searchParams]
    ),
    (params: Partial<{[key in K]: unknown}>) => {
      const o = cleanObject({...Object.fromEntries(searchParams), ...params }) as URLSearchParamsInit
      return setSearchParams(o)
    }
  ] as const
}
