import React from 'react'
import styled from '@emotion/styled'

import { ProjectListScreen } from 'screens/project-list'
import { useAuth } from 'context/authContext'

export const AuthenticatedApp: React.FC = () => {
  const { logout } = useAuth()

  return <Container>
    <Header>
      <HeaderLeft>
        <h3>Logo</h3>
        <h3>项目</h3>
        <h3>用户</h3>
      </HeaderLeft>
      <HeaderRight>
        <button onClick={logout}>登出</button>
      </HeaderRight>
    </Header>
    <Main>
      <ProjectListScreen />
    </Main>
  </Container>
}

const Container = styled.div`
  display: grid;
  grid-template-rows: 6rem 1fr;
  height: 100vh;
`;

// grid-area 用来给grid子元素起名字
const Header = styled.header`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;
const HeaderLeft = styled.div`
  display: flex;
  align-items: center;
`;
const HeaderRight = styled.div``;
const Main = styled.main`
`;
