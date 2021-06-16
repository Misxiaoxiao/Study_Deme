import { useEffect } from 'react'
import { useHttp } from 'utils/http'
import { useAsync } from 'utils/useAsync'
import { UserType } from 'screens/project-list/search-panel'
import { cleanObject } from 'utils'

export const useUser = (param?: Partial<UserType>) => {
  const client = useHttp()
  const { run, ...result } = useAsync<UserType[]>()

  useEffect(() => {
    run(client('users', {data: cleanObject(param || {})}))
  }, [param, client, run])

  return {
    ...result
  }
}
