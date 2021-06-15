import React from 'react'
import { useUser } from 'utils/user'
import { IdSelect } from './idSelect'

export const UserSelect: React.FC<React.ComponentProps<typeof IdSelect>> = (props) => {
  const { data: users } = useUser()

  return <IdSelect options={users || []} {...props}></IdSelect>
}
