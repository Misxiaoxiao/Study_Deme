import { useMutation, useQuery } from 'react-query'
import type { QueryKey } from 'react-query'
import type { EpicType } from 'types/epic'
import { useHttp } from './http'
import { useAddConfig, useDeleteConfig } from './use-optimistic-options'

export const useEpics = (params?: Partial<EpicType>) => {
  const client = useHttp()

  return useQuery<EpicType[]>(
    ['epics', params],
    () => client('epics', { data: params })
  )
}

export const useAddEpic = (queryKey: QueryKey) => {
  const client = useHttp()

  return useMutation(
    (params: Partial<EpicType>) => client('epics', {
      data: params,
      method: 'POST'
    }),
    useAddConfig(queryKey)
  )
}

export const useDeleteEpic = (queryKey: QueryKey) => {
  const client = useHttp()

  return useMutation(
    ({ id }: { id: number }) => client(`epics/${id}`, {
      method: 'DELETE'
    }),
    useDeleteConfig(queryKey)
  )
}
