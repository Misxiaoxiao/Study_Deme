import type { KanbanType } from 'types/kanban'
import { useHttp } from './http'
import { useQuery } from 'react-query'

export const useKanbans = (param?: Partial<KanbanType>) => {
  const client = useHttp()

  return useQuery<KanbanType[]>(
    ['kanbans', param], () => client('kanbans', { data: param || {} })
  )
}