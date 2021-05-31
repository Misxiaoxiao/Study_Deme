/** @jsxImportSource @emotion/react */
// import { jsx } from '@emotion/react'
import React from 'react'
import type { Dispatch, SetStateAction } from 'react'
import { Input, Select, Form } from 'antd'

export interface UserType {
  id: string;
  name: string;
  email: string;
  title: string;
  organization: string;
  token: string;
}

interface SearchPanelProps {
  users: UserType[],
  param: {
    name: string;
    personId: string;
  },
  setParam: Dispatch<SetStateAction<SearchPanelProps['param']>>
}

export const SearchPanel: React.FC<SearchPanelProps> = ({param, setParam, users}) => {
  return (
    <Form css={{ marginBottom: '2rem' }} layout={'inline'}>
      <Form.Item>
        <Input type="text" value={param.name} onChange={e => setParam({
          ...param,
          name: e.target.value
        })} placeholder={'项目名'} />
      </Form.Item>
      <Form.Item>
        <Select value={param.personId} onChange={val => setParam({
          ...param,
          personId: val
        })}>
          <Select.Option value={''}>负责人</Select.Option>
          {
            users.map((user: UserType) => <Select.Option value={user.id} key={user.id}>{user.name}</Select.Option>)
          }
        </Select>
      </Form.Item>
    </Form>
  )
}
