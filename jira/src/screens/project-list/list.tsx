import React from 'react'

export const List: React.FC<any> = ({ list, users }) => {
  return (
    <table>
      <thead>
        <tr>
          <th>名称</th>
          <th>负责人</th>
        </tr>
      </thead>
      <tbody>
        {list.map((project: any) => <tr key={project.id}>
          <td>{project.name}</td>
          <td>{users.find((user: any) => user.id === project.personId)?.name}</td>
        </tr>)}
      </tbody>
    </table>
  )
}
