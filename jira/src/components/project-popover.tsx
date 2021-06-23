import React from 'react'
import { List, Popover, Typography, Divider } from 'antd'
import { useProjects } from 'utils/project'
import styled from '@emotion/styled'
import { ButtonNoPadding } from 'components/lib'
import { useProjectModal } from 'screens/project-list/util'

interface ProjectPopoverPropsType {
}

export const ProjectPopover: React.FC<ProjectPopoverPropsType> = (props) => {
  const { data: projects, refetch } = useProjects()
  const pinnedProjects = projects?.filter(project => project.pin)
  const { open } = useProjectModal()

  const content = <ContentContainer>
    <Typography.Text type={'secondary'}>收藏项目</Typography.Text>
    <List>
      {
        pinnedProjects?.map(project => <List.Item key={project.id}>
          <List.Item.Meta title={project.name} />
        </List.Item>)
      }
    </List>
    <Divider />
    <ButtonNoPadding type={'link'} onClick={open}>创建项目</ButtonNoPadding>
  </ContentContainer>
  
  return <Popover placement={'bottom'} content={content} onVisibleChange={() => refetch()}>
    <span>项目</span>
  </Popover>
}

const ContentContainer = styled.div`
  min-width: 30rem;
`
