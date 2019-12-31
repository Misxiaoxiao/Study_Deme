import './App.css';
import React from 'react';
import { Provider } from 'react-redux';
import Store from './store/store';
import Routes from './routes/routes';

const store = Store();

function App() {
  return (
    <div className="App">
      <Provider store={store}>
        <Routes />
      </Provider>
    </div>
  )
}

export default App;
