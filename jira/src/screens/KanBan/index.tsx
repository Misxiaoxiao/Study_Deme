import styled from '@emotion/styled'
import { useDocumentTitle, ScreenContainer } from 'components/lib'
import React from 'react'
import { useKanbans } from 'utils/kanban'
import { useTasks } from 'utils/task'
import { KanbanColumn } from './kanban.column'
import { SearchPanel } from './search-panel'
import { useKanbanSearchParams, useProjectInUrl, useTasksSearchParams } from './util'
import { Spin } from 'antd'
import { CreateKanban } from './create-kanban'
import { TaskModal } from './task-modal'

export const KanBanScreen: React.FC = () => {
  useDocumentTitle('看板列表')
  
  const { data: currentProject } = useProjectInUrl()
  const { data: kanbans, isLoading: kanbanIsLoading } = useKanbans(useKanbanSearchParams())
  const { isLoading: taskIsLoading } = useTasks(useTasksSearchParams())

  const isLoading = kanbanIsLoading || taskIsLoading

  return <ScreenContainer>
    <h1>{currentProject?.name}看板</h1>
    <SearchPanel />
    {
      isLoading ? <Spin size={'large'} />
        : <ColumnsContainer>
        {
          kanbans?.map(kanban => <KanbanColumn key={kanban.id} kanban={kanban} />)
        }
      <CreateKanban />
      </ColumnsContainer>
    }
    <TaskModal />
  </ScreenContainer>
}

export const ColumnsContainer = styled.div`
  display: flex;
  overflow-x: auto;
  margin-right: 2rem;
  flex: 1;
`
