import React from 'react'
import { useTaskTypes } from 'utils/task-type'
import { IdSelect } from './idSelect'

export const TaskTypeSelect: React.FC<React.ComponentProps<typeof IdSelect>> = (props) => {
  const { data: taskTypes } = useTaskTypes()

  return <IdSelect options={taskTypes || []} {...props}></IdSelect>
}
