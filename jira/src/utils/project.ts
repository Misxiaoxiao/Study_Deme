import { useEffect, useCallback } from 'react'
import { useHttp } from 'utils/http'
import { useAsync } from 'utils/useAsync'
import { cleanObject, useDebounce } from 'utils'
import type { ProjectType } from 'screens/project-list/list'

export const useProjects = (params?: Partial<ProjectType>) => {
  const client = useHttp()
  const debounceParam = useDebounce(params)
  const { run, ...result } = useAsync<ProjectType[]>()

  const fetchProjects = useCallback(
    () => client('projects', {data: cleanObject(debounceParam || {})}),
    [debounceParam, client]
  )

  useEffect(() => {
    run(fetchProjects(), {
      retry: fetchProjects
    })
  }, [debounceParam, run, fetchProjects])

  return {
    ...result
  }
}

export const useEditProject = () => {
  const { run, ...asyncResult } = useAsync()
  const client = useHttp()
  const mutate = (params: Partial<ProjectType>) => {
    return run(client(`projects/${params.id}`, {
      data: params,
      method: 'PATCH'
    }))
  }

  return {
    mutate,
    ...asyncResult
  }
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
