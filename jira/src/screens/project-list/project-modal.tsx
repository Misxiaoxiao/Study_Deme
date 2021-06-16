import React from 'react'
import { Drawer, Button } from 'antd'

interface ProjectModalPropsType {
  projectModalOpen: boolean;
  onClose: () => void;
}

export const ProjectModal: React.FC<ProjectModalPropsType> = (props) => {
  const { projectModalOpen, onClose } = props

  return <Drawer onClose={onClose} visible={projectModalOpen} width={'100%'}>
    <h1>Project Modal</h1>
    <Button onClick={onClose}>关闭</Button>
  </Drawer>
}
