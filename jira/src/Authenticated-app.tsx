import React from 'react'
import { Button, Dropdown, Menu } from 'antd'
import styled from '@emotion/styled'
import { Row } from 'components/lib'
import { Navigate, Route, Routes } from 'react-router'
import { BrowserRouter as Router } from 'react-router-dom'

import { ProjectListScreen } from 'screens/project-list'
import { ProjectScreen } from 'screens/project'
import { useAuth } from 'context/authContext'
import { useDocumentTitle } from 'components/lib'
import { resetRoute } from 'utils'

import { ReactComponent as SoftwareLogo } from 'assets/software-logo.svg'

export const AuthenticatedApp: React.FC = () => {
  useDocumentTitle('项目列表')

  return <Container>
    <PageHeader />
    <Main>
      <Router>
        <Routes>
          <Route path="/projects" element={<ProjectListScreen />} />
          <Route path="/projects/:projectId/*" element={<ProjectScreen />} />
          <Navigate to="/projects" />
        </Routes>
      </Router>
    </Main>
  </Container>
}

const PageHeader = () => {
  const { logout, user } = useAuth()

  return <Header between={true}>
    <HeaderLeft gap={true}>
      {/* <img src={softwareLogo} alt="" /> */}
      <Button type="link" onClick={resetRoute}>
        <SoftwareLogo width={'18rem'} color={'rgb(38, 132, 255)'} />
      </Button>
      <h3>项目</h3>
      <h3>用户</h3>
    </HeaderLeft>
    <HeaderRight>
      <Dropdown overlay={<Menu>
        <Menu.Item key={'logout'}>
          <Button type="link" onClick={logout}>登出</Button>
        </Menu.Item>
      </Menu>}>
        <Button type="link" onClick={e => e.preventDefault()}>
          Hi，{user?.name}
        </Button>
      </Dropdown>
    </HeaderRight>
  </Header>
}

const Container = styled.div`
  display: grid;
  grid-template-rows: 6rem 1fr;
  height: 100vh;
`

// grid-area 用来给grid子元素起名字
const Header = styled(Row)`
  padding: 3.2rem;
  box-shadow: 0 0 5px 0 rgba(0, 0, 0, .1);
  z-index: 1;
`
const HeaderLeft = styled(Row)``
const HeaderRight = styled.div``
const Main = styled.main``
