import React from 'react'
import type { UserType } from 'types/user'
import { Link } from 'react-router-dom'

import { Table, Dropdown, Menu, Modal } from 'antd'
import type { TableProps } from 'antd'
import dayjs from 'dayjs'
import { Pin } from 'components/pin'
import { useDeleteProject, useEditProject } from 'utils/project'
import { ButtonNoPadding } from 'components/lib'
import { useProjectModal, useProjectsQueryKey } from './util'
import type { ProjectType } from 'types/project'

interface ListProps extends TableProps<ProjectType> {
  users: UserType[];
  refresh?: () => void;
}

export const List: React.FC<ListProps> = ({ users, ...props }) => {
  const { mutate } = useEditProject(useProjectsQueryKey())
  const pinProject = (id: number) => (pin: boolean) => mutate({id, pin})
  

  return <Table
    rowKey={row => row.id}
    pagination={false}
    columns={[
      {
        title: <Pin checked={true} disabled={true} />,
        render(value, project) {
          return <Pin checked={project.pin} onCheckedChange={pinProject(project.id)}/>
        }
      },
      {
        title: '名称',
        sorter: (a, b) => a.name.localeCompare(b.name),
        render(value, project) {
          return <Link to={String(project.id)}>{project.name}</Link>
        }
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
      },
      {
        render (value, project) {
          return <More project={project} />
        }
      }
    ]}
    {...props}
  />
}

const More = ({ project }: { project: ProjectType }) => {
  const { startEdit } = useProjectModal()
  const editPeoject = (id: number) => () => startEdit(id)
  const { mutate: deleteProject } = useDeleteProject(useProjectsQueryKey())

  const confirmDeleteProject = (id: number) => {
    Modal.confirm({
      title: '确定删除这个项目吗？',
      content: '点击确定删除',
      okText: '确定',
      onOk() {
        deleteProject(id)
      }
    })
  } 

  return <Dropdown overlay={<Menu>
    <Menu.Item key={'edit'} onClick={editPeoject(project.id)}>编辑</Menu.Item>
    <Menu.Item key={'delete'} onClick={() => confirmDeleteProject(project.id)}>删除</Menu.Item>
  </Menu>}>
    <ButtonNoPadding type={'link'}>...</ButtonNoPadding>
  </Dropdown>
}
