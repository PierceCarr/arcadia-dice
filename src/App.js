import React, { Component } from 'react';
// import logo from './logo.svg';
import HomeScreen from './HomeScreen.js';
import './App.css';

class App extends Component {
  render() {
    return (
      <HomeScreen/>
    );
  }
}

export default App;

/**
create-react-app default app:
<div className="App">
    <header className="App-header">
      <img src={logo} className="App-logo" alt="logo" />
      <p>
        Edit <code>src/App.js</code> and save to reload.
      </p>
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
**/