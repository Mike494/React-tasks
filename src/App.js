import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Customerlist from './Customerlist';

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Customer list</h1>
        </header>
       <Customerlist/>
      </div>
    );
  }
}

export default App;
