import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
// import App from './App';
import { AppProviders } from 'context'
import HomePage from 'page/home'
// import Test from 'page/Test'
import reportWebVitals from './reportWebVitals';

import 'antd/dist/antd.css'

ReactDOM.render(
  <React.StrictMode>
    <AppProviders>
      <HomePage />
    </AppProviders>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
