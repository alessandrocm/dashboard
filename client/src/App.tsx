import React from 'react';
import './App.css';
import { WhiteBoard } from './core';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <WhiteBoard
          color={'black'}
          fillColor={''}
          height={500}
          size={1}
          tool={'PENCIL'}
          width={800}
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
