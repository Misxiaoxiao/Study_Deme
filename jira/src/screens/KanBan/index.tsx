import styled from '@emotion/styled'
import { useDocumentTitle } from 'components/lib'
import React from 'react'
import { useKanbans } from 'utils/kanban'
import { KanbanColumn } from './kanban.column'
import { SearchPanel } from './search-panel'
import { useKanbanSearchParams, useProjectInUrl } from './util'

export const KanBanScreen: React.FC = () => {
  useDocumentTitle('看板列表')
  
  const { data: currentProject } = useProjectInUrl()
  const { data: kanbans } = useKanbans(useKanbanSearchParams())

  return <div>
    <h1>{currentProject?.name}看板</h1>
    <SearchPanel />
    <ColumnsContainer>
      {
        kanbans?.map(kanban => <KanbanColumn key={kanban.id} kanban={kanban} />)
      }
    </ColumnsContainer>
  </div>
}

const ColumnsContainer = styled.div`
  display: flex;
  overflow: hidden;
  margin-right: 2rem;
`
