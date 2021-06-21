import React from 'react'
import { KanbanType } from 'types/kanban'
import { useTasks } from 'utils/task'
import { useTaskTypes } from 'utils/task-type'
import { useTasksSearchParams } from './util'

import taskIcon from 'assets/task.svg'
import bugIcon from 'assets/bug.svg'
import styled from '@emotion/styled'
import { Card } from 'antd'

interface KanbanColumnPropsType {
  kanban: KanbanType
}

const TaskTypeIcon: React.FC<{ id: number }> = ({ id }) => {
  const { data: taskTypes } = useTaskTypes()
  const name = taskTypes?.find(taskType => taskType.id === id)?.name

  if (!name) return null

  return <img src={name === 'task' ? taskIcon : bugIcon} alt="" />
}

export const KanbanColumn: React.FC<KanbanColumnPropsType> = (props) => {
  const { kanban } = props
  const { data: allTasks } = useTasks(useTasksSearchParams())
  const tasks = allTasks?.filter(task => task.kanbanId === kanban.id)

  return <Container>
    <h3>{kanban.name}</h3>
    <TasksContainer>
      {
        tasks?.map(task => <Card
          style={{ marginBottom: '0.5rem' }}
          key={task.id}
        >
          <div>
            {task.name}
          </div>
          <TaskTypeIcon id={task.typeId} />
        </Card>)
      }
    </TasksContainer>
  </Container>
}

const Container = styled.div`
  min-width: 27rem;
  border-radius: 6px;
  background-color: rgb(244, 245, 247);
  display: flex;
  flex-direction: column;
  padding: 0.7rem 0.7rem 1rem;
  margin-right: 1.5rem;
`

const TasksContainer = styled.div`
  overflow: scroll;
  flex: 1;
  ::-webkit-scrollbar {
    display: none;
  }
`
