import React from 'react'
import { Link } from 'react-router-dom'
import { Routes, Route, Navigate } from 'react-router'

import { KanBanScreen } from 'screens/KanBan'
import { EpicScreen } from 'screens/epic'

export const ProjectScreen: React.FC = () => {
  return <h1>
    project screen
    <Link to="kanban">看板</Link>
    <Link to="epic">任务组</Link>
    <Routes>
      <Route path="/kanban" element={<KanBanScreen />} />
      <Route path="/epic" element={<EpicScreen />} />
      <Navigate to={window.location.pathname + '/kanban'} />
    </Routes>
  </h1>
}
