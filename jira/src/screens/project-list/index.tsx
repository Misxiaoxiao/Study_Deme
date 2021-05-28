import React, { useEffect, useState } from 'react'
import styled from '@emotion/styled'

import {List} from './list'
import {SearchPanel} from './search-panel'
import { cleanObject, useMount, useDebounce } from 'utils'

import { useHttp } from 'utils/http'

export const ProjectListScreen: React.FC = () => {
  const [param, setParam] = useState({
    name: '',
    personId: ''
  })
  const debounceParam = useDebounce(param)

  const [list, setList] = useState([])
  const [users, setUsers] = useState([])

  const client = useHttp()

  useEffect(() => {
    client('projects', {data: cleanObject(debounceParam)}).then(setList)
  }, [debounceParam])

  useMount(() => {
    client('users').then(setUsers)
  })

  return (
    <Container>
      <h1>项目列表</h1>
      <SearchPanel param={param} setParam={setParam} users={users} />
      <List list={list} users={users} />
    </Container>
  )
}

const Container = styled.div`
  padding: 3.2rem;
`
