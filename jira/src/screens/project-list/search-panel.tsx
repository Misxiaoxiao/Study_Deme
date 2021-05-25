import React from 'react'
import type { Dispatch, SetStateAction } from 'react'

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
        <input type="text" value={param.name} onChange={e => setParam({
          ...param,
          name: e.target.value
        })} />
        <select value={param.personId} onChange={e => setParam({
          ...param,
          personId: e.target.value
        })}>
          <option value={''}>负责人</option>
          {
            users.map((user: User) => <option value={user.id} key={user.id}>{user.name}</option>)
          }
        </select>
      </div>
    </form>
  )
}
