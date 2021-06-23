import { useHttp } from 'utils/http'
import { useQuery } from 'react-query'
import type { UserType } from 'types/user'

export const useUser = (params?: Partial<UserType>) => {
  const client = useHttp()

  return useQuery<UserType[]>(
    ['users', params],
    () => client('users', { data: params || {} })
  )
}

// export const useUser = (param?: Partial<UserType>) => {
//   const client = useHttp()
//   const { run, ...result } = useAsync<UserType[]>()

//   useEffect(() => {
//     run(client('users', {data: cleanObject(param || {})}))
//   }, [param, client, run])

//   return {
//     ...result
//   }
// }
