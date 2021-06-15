import React from 'react'
import styled from '@emotion/styled'

import {List} from './list'
import {SearchPanel} from './search-panel'

import { useProjects } from 'utils/project'
import { Typography } from 'antd'
import { useUser } from 'utils/user'
import { useProjectSearchParams } from './utils'
import { useDocumentTitle } from 'components/lib'

export const ProjectListScreen: React.FC = () => {
  useDocumentTitle('项目列表', false)

  const [param, setParam] = useProjectSearchParams()
  const { error, isLoading, data: list, retry } = useProjects(param)
  const { data: users } = useUser()

  return (
    <Container>
      <h1>项目列表</h1>
      <button onClick={retry}>retry</button>
      <SearchPanel param={param} setParam={setParam} users={users || []} />
      {error ? <Typography.Text type="danger">{error.message}</Typography.Text> : null}
      <List refresh={retry} loading={isLoading} dataSource={list || []} users={users || []} />
    </Container>
  )
}

// ProjectListScreen.whyDidYouRender = true

const Container = styled.div`
  padding: 3.2rem;
`
