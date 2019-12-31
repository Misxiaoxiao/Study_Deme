import React, { Component } from 'react';
import { BrowserRouter, Router, Switch } from 'react-router-dom';
import Authroute from 'components/authroute/authroute';

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
        </div>
      </BrowserRouter>
    );
  }
}

export default Routes;
