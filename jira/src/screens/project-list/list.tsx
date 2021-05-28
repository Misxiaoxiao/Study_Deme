import React from 'react'
import type { User } from './search-panel'

import { Table } from 'antd'
import dayjs from 'dayjs'

interface Project {
  id: string;
  name: string;
  personId: string;
  pin: boolean;
  organization: string;
  created: number;
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
        title: '部门',
        dataIndex: 'organization',
      },
      {
        title: '负责人',
        render (value, project) {
          return <span>
            {users.find((user: User) => user.id === project.personId)?.name}
          </span>
        }
      },
      {
        title: '创建时间',
        render (value, project) {
          return <span>
            {project.created ? dayjs(project.created).format('YYYY-MM-DD') : '无'}
          </span>
        }
      }
    ]}
    dataSource={list}
  />
}
