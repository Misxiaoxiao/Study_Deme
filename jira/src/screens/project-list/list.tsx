import React from 'react'
import type { UserType } from './search-panel'

import { Table } from 'antd'
import type { TableProps } from 'antd'
import dayjs from 'dayjs'

export interface ProjectType {
  id: string;
  name: string;
  personId: string;
  pin: boolean;
  organization: string;
  created: number;
}

interface ListProps extends TableProps<ProjectType> {
  users: UserType[]
}

export const List: React.FC<ListProps> = ({ users, ...props }) => {

  return <Table
    rowKey={row => row.id}
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
            {users.find((user: UserType) => user.id === project.personId)?.name}
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
    {...props}
  />
}
