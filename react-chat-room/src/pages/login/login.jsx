import React, { memo } from 'react';
import Logo from 'components/logo/logo';
import { List, InputItem, WingBlank, Button, WhiteSpace } from 'antd-mobile';
import { connect } from 'react-redux';
import { userFuc } from 'reducer/user/redux';
import HocForm from 'components/hocForm/hocForm';
import './login.css';
import { Redirect } from 'react-router-dom';

const Login = (props) => {
  const register = () => {
    props.history.push('/register')
  }

  const handleLogin = () => {
    props.login(props.state)
  }

  return (
    <div className="login">
      {
        (props.redirectTo && props.redirectTo !== '/login') ? <Redirect to={props.redirectTo} /> : ''
      }
      <div className="logo-wrapper">
        <Logo />
      </div>
      <WingBlank>
        <List>
          <InputItem placeholder="" onChange={value => { props.handleChange('user', value) }}>用户</InputItem>
          <InputItem placeholder="" onChange={value => { props.handleChange('pwd', value) }}>密码</InputItem>
        </List>
        <WhiteSpace />
        <Button type="primary" onClick={handleLogin}>登录</Button>
        <WhiteSpace />
        <Button type="default" onClick={register}>注册</Button>
      </WingBlank>
    </div>
  )
}

const login = userFuc.login

export default connect(
  state => state.user,
  { login }
)(HocForm(memo(Login)))
