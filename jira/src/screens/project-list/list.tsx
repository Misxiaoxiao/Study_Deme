import React from 'react'
import type { User } from './search-panel'

import { Table } from 'antd'

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

  return <Table
    pagination={false}
    columns={[
      {
        title: '名称',
        dataIndex: 'name',
        sorter: (a, b) => a.name.localeCompare(b.name)
      },
      {
        title: '负责人',
        render (value, project) {
          return <span>
            {users.find((user: User) => user.id === project.personId)?.name}
          </span>
        }
      }
    ]}
    dataSource={list}
  />
}
