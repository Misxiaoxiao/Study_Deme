import React from 'react'
import styled from '@emotion/styled'

import {List} from './list'
import {SearchPanel} from './search-panel'

import { useProjects } from 'utils/project'
import { Typography } from 'antd'
import { useUser } from 'utils/user'
import { useUrlQueryParam } from 'utils/url'


export const ProjectListScreen: React.FC = () => {
  const [param, setParam] = useUrlQueryParam(['name', 'personId'])
  const { error, isLoading, data: list } = useProjects(param)
  const { data: users } = useUser()

  return (
    <Container>
      <h1>项目列表</h1>
      <SearchPanel param={param} setParam={setParam} users={users || []} />
      {error ? <Typography.Text type="danger">{error.message}</Typography.Text> : null}
      <List loading={isLoading} dataSource={list || []} users={users || []} />
    </Container>
  )
}

// ProjectListScreen.whyDidYouRender = true

const Container = styled.div`
  padding: 3.2rem;
`
