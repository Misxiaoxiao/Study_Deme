import React from 'react'
import type { Dispatch, SetStateAction } from 'react'
import { Input, Select } from 'antd'

export interface User {
  id: string;
  name: string;
  email: string;
  title: string;
  organization: string;
  token: string;
}

interface SearchPanelProps {
  users: User[],
  param: {
    name: string;
    personId: string;
  },
  setParam: Dispatch<SetStateAction<SearchPanelProps['param']>>
}

export const SearchPanel: React.FC<SearchPanelProps> = ({param, setParam, users}) => {
  return (
    <form>
      <div>
        <Input type="text" value={param.name} onChange={e => setParam({
          ...param,
          name: e.target.value
        })} />
        <Select value={param.personId} onChange={val => setParam({
          ...param,
          personId: val
        })}>
          <Select.Option value={''}>负责人</Select.Option>
          {
            users.map((user: User) => <Select.Option value={user.id} key={user.id}>{user.name}</Select.Option>)
          }
        </Select>
      </div>
    </form>
  )
}
