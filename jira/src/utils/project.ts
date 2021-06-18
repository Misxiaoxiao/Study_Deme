import { useHttp } from 'utils/http'
import { useAsync } from 'utils/useAsync'
import type { ProjectType } from 'screens/project-list/list'
import { useQuery, useMutation, useQueryClient } from 'react-query'

export const useProjects = (params?: Partial<ProjectType>) => {
  const client = useHttp()

  return useQuery<ProjectType[]>(['projects', params], () => client('projects', { data: params || {} }))
}

export const useEditProject = () => {
  const client = useHttp()
  const queryClient = useQueryClient()

  return useMutation(
    (params: Partial<ProjectType>) => client(`projects/${params.id}`, {
      method: 'PATCH',
      data: params
    }), {
      onSuccess: () => queryClient.invalidateQueries('projects')
    }
  )
}

export const useAddProject = () => {
  const { run, ...asyncResult } = useAsync()
  const client = useHttp()
  const mutate = (params: Partial<ProjectType>) => {
    run(client(`projects/${params.id}`, {
      data: params,
      method: 'POST'
    }))
  }

  return {
    mutate,
    ...asyncResult
  }
}
