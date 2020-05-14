import React from 'react';
import logo from './logo.svg';
import Hello from './components/Hello';
import LikeButton from './components/likeButton';
import MouseTracker from './components/MouseTracker';
import useMouseTracker from './hooks/useMouseTracker';
import './App.css';

function App() {

  const position = useMouseTracker()

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>

        <p>x: { position.x }, y: { position.y }</p>

        <MouseTracker />

        <Hello message='2' />
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
