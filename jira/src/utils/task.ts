import { TaskType } from 'types/task'
import { useHttp } from './http'
import { useQuery } from 'react-query'

export const useTasks = (param?: Partial<TaskType>) => {
  const client = useHttp()

  return useQuery<TaskType[]>(
    ['tasks', param], () => client('tasks', { data: param || {} })
  )
}
