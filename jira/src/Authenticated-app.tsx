import React from 'react'

import { ProjectListScreen } from 'screens/project-list'
import { useAuth } from 'context/authContext'

export const AuthenticatedApp: React.FC = () => {
  const { logout } = useAuth()

  return <div>
    <button onClick={() => { logout() } } >登出</button>
    <ProjectListScreen />
  </div>
}
