import React from 'react'
import { Drawer, Button } from 'antd'
import { useProjectModal } from './utils'

interface ProjectModalPropsType {
}

export const ProjectModal: React.FC<ProjectModalPropsType> = () => {
  const {projectModalOpen, close} = useProjectModal()

  return <Drawer onClose={close} visible={projectModalOpen} width={'100%'}>
    <h1>Project Modal</h1>
    <Button onClick={close}>关闭</Button>
  </Drawer>
}
