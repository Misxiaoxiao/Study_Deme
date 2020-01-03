import React, { memo, useEffect } from 'react';
import Logo from 'components/logo/logo'
import HocForm from 'components/hocForm/hocForm';
import { WingBlank, List, InputItem, WhiteSpace, Radio, Button } from 'antd-mobile';
import { userFuc } from 'reducer/user/redux';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import './register.css';

const RadioItem = Radio.RadioItem;
const register = userFuc.register;

const Register = (props) => {
  const handleRegister = () => {
    props.register(props.state)
  }

  useEffect(
    () => {
      if (!props.state.type) {
        props.handleChange('type', 'seeker');
      }
    }
  )

  return (
    <div className="register">
      {
        (props.redirectTo && props.redirectTo !== '/login') ? <Redirect to={props.redirectTo} /> : ''
      }
      <Logo />
      <WingBlank>
        <List>
          <InputItem onChange={value => { props.handleChange('user', value) }}>用户名</InputItem>
          <InputItem onChange={value => { props.handleChange('pwd', value) }} type="password">密码</InputItem>
          <InputItem onChange={value => { props.handleChange('repeatPwd', value) }} type="password">确认密码</InputItem>
        </List>
        <WhiteSpace />
        <p className="register-role">选择角色</p>
        <List>
          <RadioItem checked={props.state.type === 'seeker'} onChange={() => {props.handleChange('type', 'seeker')}}>求职者</RadioItem>
          <RadioItem checked={props.state.type === 'boss'} onChange={() => {props.handleChange('type', 'boss')}}>BOSS</RadioItem>
        </List>
        <WhiteSpace />
        <Button type="primary" onClick={handleRegister}>注册</Button>
      </WingBlank>
    </div>
  )
}

export default connect(
  state => state.user,
  { register }
)(HocForm(memo(Register)))
