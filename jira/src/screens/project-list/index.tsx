import React from 'react'
import styled from '@emotion/styled'

import {List} from './list'
import {SearchPanel} from './search-panel'

import { useProjects } from 'utils/project'
import { Typography } from 'antd'
import { useUser } from 'utils/user'
import { useProjectSearchParams, useProjectModal } from './utils'
import { Row, useDocumentTitle, ButtonNoPadding } from 'components/lib'

interface ProjectListScreenPropsType {
  // projectButton: JSX.Element;
}

export const ProjectListScreen: React.FC<ProjectListScreenPropsType> = () => {
  useDocumentTitle('项目列表', false)

  const [param, setParam] = useProjectSearchParams()
  const { error, isLoading, data: list, retry } = useProjects(param)
  const { data: users } = useUser()
  const { open } = useProjectModal()

  return (
    <Container>
      <Row between={true}>
        <h1>项目列表</h1>
        <ButtonNoPadding type={'link'} onClick={open}>创建项目</ButtonNoPadding>
      </Row>
      <SearchPanel param={param} setParam={setParam} users={users || []} />
      {error ? <Typography.Text type="danger">{error.message}</Typography.Text> : null}
      <List
        refresh={retry}
        loading={isLoading}
        dataSource={list || []}
        users={users || []}
      />
    </Container>
  )
}

// ProjectListScreen.whyDidYouRender = true

const Container = styled.div`
  padding: 3.2rem;
`
