import React from 'react'
import styled from '@emotion/styled'

import {List} from './list'
import {SearchPanel} from './search-panel'

import { useProjects } from 'utils/project'
import { Typography, Button } from 'antd'
import { useUser } from 'utils/user'
import { useProjectSearchParams } from './utils'
import { Row, useDocumentTitle } from 'components/lib'

interface ProjectListScreenPropsType {
  setProjectModalOpen: (isOpen: boolean) => void;
}

export const ProjectListScreen: React.FC<ProjectListScreenPropsType> = (props) => {
  useDocumentTitle('项目列表', false)

  const [param, setParam] = useProjectSearchParams()
  const { error, isLoading, data: list, retry } = useProjects(param)
  const { data: users } = useUser()

  return (
    <Container>
      <Row between={true}>
        <h1>项目列表</h1>
        <Button onClick={() => props.setProjectModalOpen(true)}>创建项目</Button>
      </Row>
      <SearchPanel param={param} setParam={setParam} users={users || []} />
      {error ? <Typography.Text type="danger">{error.message}</Typography.Text> : null}
      <List
        refresh={retry}
        loading={isLoading}
        dataSource={list || []}
        users={users || []}
        setProjectModalOpen={props.setProjectModalOpen}
      />
    </Container>
  )
}

// ProjectListScreen.whyDidYouRender = true

const Container = styled.div`
  padding: 3.2rem;
`
