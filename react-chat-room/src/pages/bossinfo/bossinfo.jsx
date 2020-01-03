import React, { useState, useCallback, memo } from 'react';
import { NavBar, WhiteSpace, InputItem, TextareaItem, Button } from 'antd-mobile';
import { Redirect } from 'react-router-dom';
import { userFuc } from 'reducer/user/redux';
import { connect } from 'react-redux';

const update = userFuc.update

const BossInfo = (props) => {
  const [ state, setState ] = useState({
    title: '',
    company: '',
    money: '',
    desc: '',
    avatar: ''
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
        BOSS完善信息
      </NavBar>
      <WhiteSpace />
      <InputItem onChange={v => onChange('title', v)}>招聘职位</InputItem>
      <InputItem onChange={v => onChange('company', v)}>公司名称</InputItem>
      <InputItem onChange={v => onChange('money', v)}>薪资范围</InputItem>
      <TextareaItem onChange={v => onChange('desc', v)} rows={3} autoHeight title="职位要求" />
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
)(memo(BossInfo))
