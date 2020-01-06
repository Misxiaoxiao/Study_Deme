import React, { useState, memo } from 'react';
import { List, Grid } from 'antd-mobile';

const AvatarSelector = (props) => {
  const [ state, setState ] = useState({});

  const avatarList = ['boy', 'bull', 'chick', 'crab', 'girl', 'hedgehog', 'hippopotamus', 'koala', 'lemur', 'man', 'pig', 'tiger', 'whale', 'woman', 'zebra'].map(v => ({
    icon: require(`assets/img/${v}.png`),
    text: v
  }))

  const gridHeader = state.icon ?
                     (
                       <div>
                         <span>已选择的头像是</span>
                         <img style={{ width: 20 }} src={state.icon} alt="" />
                       </div>
                     )
                     :
                     '请选择头像';

  return (
    <div>
      <List renderHeader={() => gridHeader}>
        <Grid
          data={avatarList}
          columnNum={5}
          onClick={el => {
            setState(el)
            props.selectAvatar && props.selectAvatar(el.text)
          }}
        />
      </List>
    </div>
  )
}

export default memo(AvatarSelector)
