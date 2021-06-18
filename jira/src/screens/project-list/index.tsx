import React from 'react'
import styled from '@emotion/styled'

import {List} from './list'
import {SearchPanel} from './search-panel'

import { useProjects } from 'utils/project'
import { useUser } from 'utils/user'

import { useProjectSearchParams } from './utils'
import { Row, useDocumentTitle, ButtonNoPadding, ErrorBox } from 'components/lib'
import { useDispatch } from 'react-redux'
import { projectListActions } from 'screens/project-list/project.list.slice'

interface ProjectListScreenPropsType {
}

export const ProjectListScreen: React.FC<ProjectListScreenPropsType> = () => {
  useDocumentTitle('项目列表', false)

  const [param, setParam] = useProjectSearchParams()
  const { error, isLoading, data: list } = useProjects(param)
  const { data: users } = useUser()
  const dispatch = useDispatch()

  return (
    <Container>
      <Row between={true}>
        <h1>项目列表</h1>
        <ButtonNoPadding
          type={'link'}
          onClick={() => dispatch(projectListActions.openProjectModal())}
        >创建项目</ButtonNoPadding>
      </Row>
      <SearchPanel param={param} setParam={setParam} users={users || []} />
      <ErrorBox error={error} />
      <List
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
