import { useQuery } from 'react-query'
import { TaskTypesType } from 'types/task'
import { useHttp } from './http'

export const useTaskTypes = () => {
  const client = useHttp()

  return useQuery<TaskTypesType[]>(
    ['taskTypes'], () => client('taskTypes')
  )
}
