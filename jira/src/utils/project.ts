import { useHttp } from 'utils/http'
import type { ProjectType } from 'types/project'
import { useQuery, useMutation } from 'react-query'
import { useAddConfig, useDeleteConfig, useEditConfig } from './use-optimistic-options'
import type { QueryKey } from 'react-query'

export const useProjects = (params?: Partial<ProjectType>) => {
  const client = useHttp()

  return useQuery<ProjectType[]>(
    ['projects', params],
    () => client('projects', { data: params || {} })
  )
}

export const useEditProject = (queryKey: QueryKey) => {
  const client = useHttp();
  return useMutation(
    (params: Partial<ProjectType>) =>
      client(`projects/${params.id}`, {
        method: "PATCH",
        data: params,
      }),
    useEditConfig(queryKey)
  )
}

export const useAddProject = (queryKey: QueryKey) => {
  const client = useHttp()

  return useMutation(
    (params: Partial<ProjectType>) => client(`projects`, {
      method: 'POST',
      data: params
    }),
    useAddConfig(queryKey)
  )
}

export const useDeleteProject = (queryKey: QueryKey) => {
  const client = useHttp()

  return useMutation(
    (id: number) => client(`projects/${id}`, {
      method: 'DELETE'
    }),
    useDeleteConfig(queryKey)
  )
}

export const useProject = (id: number) => {
  const client = useHttp()
  return useQuery<ProjectType>(
    ['project', {id}],
    () => client(`projects/${id}`),
    {
      enabled: !!id
    }
  )
}
