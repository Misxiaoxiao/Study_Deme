import React from 'react'
import { List, Popover, Typography, Divider } from 'antd'
import { useProjects } from 'utils/project'
import styled from '@emotion/styled'

interface ProjectPopoverPropsType {
  projectButton: JSX.Element;
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
    {props.projectButton}
  </ContentContainer>
  
  return <Popover placement={'bottom'} content={content}>
    <span>项目</span>
  </Popover>
}

const ContentContainer = styled.div`
  min-width: 30rem;
`
