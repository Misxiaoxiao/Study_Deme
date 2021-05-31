import { useEffect } from 'react'
import { useHttp } from 'utils/http'
import { useAsync } from 'utils/useAsync'
import { cleanObject, useDebounce } from 'utils'
import type { ProjectType } from 'screens/project-list/list'

export const useProjects = (params: Partial<ProjectType>) => {
  const client = useHttp()
  const debounceParam = useDebounce(params)
  const { run, ...result } = useAsync<ProjectType[]>()

  useEffect(() => {
    run(client('projects', {data: cleanObject(debounceParam)}))
  }, [debounceParam])

  return {
    ...result
  }
}
