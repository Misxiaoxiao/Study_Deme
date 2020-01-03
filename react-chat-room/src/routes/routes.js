import React, { Component } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Authroute from 'components/authroute/authroute';
import Login from 'pages/login/login';

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
          </Switch>
        </div>
      </BrowserRouter>
    );
  }
}

export default Routes;
