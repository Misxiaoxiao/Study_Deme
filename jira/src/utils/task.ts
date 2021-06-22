import type { TaskType } from 'types/task'
import { useHttp } from './http'
import { useQuery, useMutation } from 'react-query'
import type { QueryKey } from 'react-query'
import { useAddConfig, useEditConfig, useDeleteConfig } from './use-optimistic-options'

export const useTasks = (param?: Partial<TaskType>) => {
  const client = useHttp()

  return useQuery<TaskType[]>(
    ['tasks', param], () => client('tasks', { data: param || {} })
  )
}

export const useAddTask = (queryKey: QueryKey) => {
  const client = useHttp()

  return useMutation(
    (params: Partial<TaskType>) =>
      client('tasks', {
        data: params,
        method: 'POST'
      }),
    useAddConfig(queryKey)
  )
}

export const useTask = (id?: number) => {
  const client = useHttp()

  return useQuery<TaskType>(
    ['task', { id }],
    () => client(`tasks/${id}`),
    {
      enabled: Boolean(id)
    }
  )
}

export const useEditTask = (queryKey: QueryKey) => {
  const client = useHttp();
  return useMutation(
    (params: Partial<TaskType>) =>
      client(`tasks/${params.id}`, {
        method: "PATCH",
        data: params,
      }),
    useEditConfig(queryKey)
  )
}

export const useDeleteTask = (queryKey: QueryKey) => {
  const client = useHttp()

  return useMutation(
    ({ id }: { id: number }) =>
      client(`tasks/${id}`, {
        method: 'DELETE'
      }),
    useDeleteConfig(queryKey)
  )
}
