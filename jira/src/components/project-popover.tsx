import React from 'react'
import { List, Popover, Typography, Divider } from 'antd'
import { useProjects } from 'utils/project'
import { ButtonNoPadding } from 'components/lib'
import styled from '@emotion/styled'
import { useDispatch } from 'react-redux'
import { projectListActions } from 'screens/project-list/project.list.slice'

interface ProjectPopoverPropsType {
}

export const ProjectPopover: React.FC<ProjectPopoverPropsType> = () => {
  const dispatch = useDispatch()
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
    <ButtonNoPadding
      type={'link'}
      onClick={() => dispatch(projectListActions.openProjectModal())}
    >创建项目</ButtonNoPadding>
  </ContentContainer>
  
  return <Popover placement={'bottom'} content={content}>
    <span>项目</span>
  </Popover>
}

const ContentContainer = styled.div`
  min-width: 30rem;
`
