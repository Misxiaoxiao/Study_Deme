import React, { Component } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Authroute from 'components/authroute/authroute';
import Login from 'pages/login/login';
import Register from 'pages/register/register';
import BossInfo from 'pages/bossinfo/bossinfo';
import SeekerInfo from 'pages/seekerinfo/seekerinfo';
import Chat from 'pages/chat/chat';

class Routes extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <BrowserRouter>
        <div>
          <Authroute />
          <Switch>
            <Route path="/login" component={Login} />
            <Route path="/register" component={Register} />
            <Route path="/bossinfo" component={BossInfo} />
            <Route path="/seekerinfo" component={SeekerInfo} />
            <Route path="/chat/:user" component={Chat} />
          </Switch>
        </div>
      </BrowserRouter>
    );
  }
}

export default Routes;
