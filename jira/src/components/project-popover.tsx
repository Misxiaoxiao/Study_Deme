import React from 'react'
import { List, Popover, Typography, Divider } from 'antd'
import { useProjects } from 'utils/project'
import styled from '@emotion/styled'
import { ButtonNoPadding } from 'components/lib'

interface ProjectPopoverPropsType {
  setProjectModalOpen: (isOpen: boolean) => void;
}

export const ProjectPopover: React.FC<ProjectPopoverPropsType> = (props) => {
  const { data: projects } = useProjects()
  const pinnedProjects = projects?.filter(project => project.pin)

  const content = <ContentContainer>
    <Typography.Text type={'secondary'}>收藏项目</Typography.Text>
    <List>
      {
        pinnedProjects?.map(project => <List.Item>
          <List.Item.Meta title={project.name} />
        </List.Item>)
      }
    </List>
    <Divider />
    <ButtonNoPadding type={'link'} onClick={() => props.setProjectModalOpen(true)}>创建项目</ButtonNoPadding>
  </ContentContainer>
  
  return <Popover placement={'bottom'} content={content}>
    <span>项目</span>
  </Popover>
}

const ContentContainer = styled.div`
  min-width: 30rem;
`
