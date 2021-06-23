import React from 'react'
import { List, Popover, Typography, Divider } from 'antd'
import styled from '@emotion/styled'
import { useUser } from 'utils/user'

interface UserPopoverPropsType {
}

export const UserPropover: React.FC<UserPopoverPropsType> = (props) => {
  const { data: users, refetch } = useUser()

  const content = <ContentContainer>
    <Typography.Text type={'secondary'}>组员列表</Typography.Text>
    <List>
      {
        users?.map(user => <List.Item key={user.id}>
          <List.Item.Meta title={user.name} />
        </List.Item>)
      }
    </List>
    <Divider />
  </ContentContainer>
  
  return <Popover
    placement={'bottom'}
    content={content}
    onVisibleChange={() => refetch()}
  >
    <span>组员</span>
  </Popover>
}

const ContentContainer = styled.div`
  min-width: 30rem;
`
