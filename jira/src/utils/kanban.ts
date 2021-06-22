import type { KanbanType } from 'types/kanban'
import { useHttp } from './http'
import { useQuery, useMutation } from 'react-query'
import type { QueryKey } from 'react-query'
import { useAddConfig, useDeleteConfig } from './use-optimistic-options'

export const useKanbans = (param?: Partial<KanbanType>) => {
  const client = useHttp()

  return useQuery<KanbanType[]>(
    ['kanbans', param], () => client('kanbans', { data: param || {} })
  )
}

export const useAddKanban = (queryKey: QueryKey) => {
  const client = useHttp()

  return useMutation(
    (params: Partial<KanbanType>) =>
      client('kanbans', {
        data: params,
        method: 'POST'
      }),
    useAddConfig(queryKey)
  )
}

export const useDeleteKanban = (queryKey: QueryKey) => {
  const client = useHttp()

  return useMutation(
    ({ id }: { id: number }) =>
      client(`kanbans/${id}`, {
        method: 'DELETE'
      }),
    useDeleteConfig(queryKey)
  )
}
