import React, { useState } from 'react'
import { useAddKanban } from 'utils/kanban'
import { useKanbanQueryKey, useProjectIdInUrl } from './util'
import { Container } from './kanban.column'
import { Input } from 'antd'

export const CreateKanban: React.FC = () => {
  const [name, setName] = useState('')
  const projectId = useProjectIdInUrl()
  const { mutateAsync: addKanban } = useAddKanban(useKanbanQueryKey())

  const submit = async () => {
    await addKanban({ name, projectId })

    setName('')
  }
  return <Container>
    <Input
      size={'large'}
      placeholder={'新建看板名称'}
      onPressEnter={submit}
      value={name}
      onChange={evt => setName(evt.target.value)}
    />
  </Container>
}
