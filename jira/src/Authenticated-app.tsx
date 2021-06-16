import React, { useState } from 'react'
import { Button, Dropdown, Menu } from 'antd'
import styled from '@emotion/styled'
import { Row } from 'components/lib'
import { Navigate, Route, Routes } from 'react-router'
import { BrowserRouter as Router } from 'react-router-dom'

import { ProjectListScreen } from 'screens/project-list'
import { ProjectScreen } from 'screens/project'
import { useAuth } from 'context/authContext'
import { useDocumentTitle, ButtonNoPadding } from 'components/lib'
import { resetRoute } from 'utils'
import { ProjectModal } from 'screens/project-list/project-modal'
import { ProjectPopover } from 'components/project-popover'

import { ReactComponent as SoftwareLogo } from 'assets/software-logo.svg'

export const AuthenticatedApp: React.FC = () => {
  useDocumentTitle('项目列表')
  const [projectModalOpen, setProjectModalOpen] = useState(false)

  return <Container>
    <PageHeader setProjectModalOpen={setProjectModalOpen} />
    <Main>
      <Router>
        <Routes>
          <Route path="/projects" element={<ProjectListScreen setProjectModalOpen={setProjectModalOpen} />} />
          <Route path="/projects/:projectId/*" element={<ProjectScreen />} />
          <Navigate to="/projects" />
        </Routes>
      </Router>
    </Main>
    <ProjectModal projectModalOpen={projectModalOpen} onClose={() => setProjectModalOpen(false)} />
  </Container>
}

const PageHeader = (props: { setProjectModalOpen: (isOpen: boolean) => void }) => {
  return <Header between={true}>
    <HeaderLeft gap={true}>
      {/* <img src={softwareLogo} alt="" /> */}
      <ButtonNoPadding type="link" onClick={resetRoute}>
        <SoftwareLogo width={'18rem'} color={'rgb(38, 132, 255)'} />
      </ButtonNoPadding>
      <ProjectPopover setProjectModalOpen={props.setProjectModalOpen} />
      <span>用户</span>
    </HeaderLeft>
    <HeaderRight>
      <User />
    </HeaderRight>
  </Header>
}

const User = () => {
  const { logout, user } = useAuth()

  return <Dropdown overlay={<Menu>
    <Menu.Item key={'logout'}>
      <Button type="link" onClick={logout}>登出</Button>
    </Menu.Item>
  </Menu>}>
    <Button type="link" onClick={e => e.preventDefault()}>
      Hi，{user?.name}
    </Button>
  </Dropdown>
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
