import React, { useState, useCallback, memo } from 'react';
import { NavBar, WhiteSpace, InputItem, TextareaItem, Button } from 'antd-mobile';
import AvatarSelector from 'components/avatarSelector/avatarSelector';
import { Redirect } from 'react-router-dom';
import { userFuc } from 'reducer/user/redux';
import { connect } from 'react-redux';

const update = userFuc.update

const SeekerInfo = (props) => {
  const [ state, setState ] = useState({
    title: '',
    desc: ''
  })

  const onChange = useCallback(
    (key, val) => {
      setState(state => {
        const obj = {}
        obj[key] = val
        return { ...state, ...obj }
      })
    },
    [setState]
  )

  const selectAvatar = (avatarName) => {
    onChange('avatar', avatarName)
  }

  return (
    <div className="bossinfo" style={{ paddingTop: 45 }}>
      {
        (props.redirectTo && props.redirectTo !== '/login') ? <Redirect to={props.redirectTo} /> : ''
      }
      <NavBar mode="dark">
        求职者完善信息
      </NavBar>
      <AvatarSelector selectAvatar={selectAvatar} />
      <WhiteSpace />
      <InputItem onChange={v => onChange('title', v)}>求职岗位</InputItem>
      <TextareaItem onChange={v => onChange('desc', v)} rows={3} autoHeight title="个人简介" />
      <WhiteSpace />
      <WhiteSpace />
      <WhiteSpace />
      <WhiteSpace />
      <Button type="primary" onClick={() => {props.update(state)}}>保存</Button>
    </div>
  )
}

export default connect(
  state => state.user,
  { update }
)(memo(SeekerInfo))
