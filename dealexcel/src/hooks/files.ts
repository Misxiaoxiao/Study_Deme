import { useState } from 'react'
import type { RcFile } from 'antd/lib/upload'

export const useDealFileToJson = () => {
  const [json, setJson] = useState<unknown[]>([]) // never[]
  const dealFiletoJosn = (file: RcFile) => {
    const dealJson = [ 1, 2, 3 ]
    setJson(dealJson)
  }

  return {
    json,
    dealFiletoJosn
  }
}
