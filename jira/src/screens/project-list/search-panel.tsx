/** @jsxImportSource @emotion/react */
// import { jsx } from '@emotion/react'
import React from 'react'
import { Input, Form } from 'antd'
import type { ProjectType } from 'types/project'
import { UserSelect } from 'components/user-select'
import type { UserType } from 'types/user'

interface SearchPanelProps {
  users: UserType[],
  param: Partial<Pick<ProjectType, 'name' | 'personId'>>,
  setParam: (param: SearchPanelProps['param']) => void
}

export const SearchPanel: React.FC<SearchPanelProps> = ({param, setParam, users}) => {
  return (
    <Form css={{ marginBottom: '2rem' }} layout={'inline'}>
      <Form.Item>
        <Input type="text" value={param.name || ''} onChange={e => setParam({
          ...param,
          name: e.target.value
        })} placeholder={'项目名'} />
      </Form.Item>
      <Form.Item>
        <UserSelect
          defaultOptionName={'负责人'}
          value={param.personId}
          onChange={val => setParam({
            ...param,
            personId: val
          })}
        />
      </Form.Item>
    </Form>
  )
}
