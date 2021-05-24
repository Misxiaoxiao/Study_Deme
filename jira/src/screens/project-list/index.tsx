import React, { useEffect, useState } from 'react'
import qs from 'qs'

import {List} from './list'
import {SearchPanel} from './search-panel'
import { cleanObject, useMount, useDebounce } from 'utils'

const apiUrl = process.env.REACT_APP_API_URL

export const ProjectListScreen: React.FC = () => {
  const [param, setParam] = useState({
    name: '',
    personId: ''
  })
  const debounceParam = useDebounce(param, 2000)

  const [list, setList] = useState([])
  const [users, setUsers] = useState([])

  useEffect(() => {
    fetch(`${apiUrl}/projects?${qs.stringify(cleanObject(debounceParam))}`).then(async response => {
      if (response.ok) {
        setList(await response.json())
      }
    })
  }, [debounceParam])

  useMount(() => {
    fetch(`${apiUrl}/users`).then(async response => {
      if (response.ok) {
        setUsers(await response.json())
      }
    })
  })

  return (
    <div>
      <SearchPanel param={param} setParam={setParam} users={users} />
      <List list={list} users={users} />
    </div>
  )
}
