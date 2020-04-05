import React from 'react';
import './App.css';
import { WhiteBoard } from './core';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <WhiteBoard
          color={'blue'}
          fillColor={'blue'}
          height={500}
          size={3}
          tool={'Pencil'}
          width={500}
        />
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
