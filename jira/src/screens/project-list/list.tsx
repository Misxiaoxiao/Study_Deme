import React from 'react'
import type { User } from './search-panel'

interface Project {
  id: string;
  name: string;
  personId: string;
  pin: boolean;
  organization: string;
}

interface ListProps {
  list: Project[],
  users: User[]
}

export const List: React.FC<ListProps> = ({ list, users }) => {
  return (
    <table>
      <thead>
        <tr>
          <th>名称</th>
          <th>负责人</th>
        </tr>
      </thead>
      <tbody>
        {list.map((project: Project) => <tr key={project.id}>
          <td>{project.name}</td>
          <td>{users.find((user: User) => user.id === project.personId)?.name}</td>
        </tr>)}
      </tbody>
    </table>
  )
}
