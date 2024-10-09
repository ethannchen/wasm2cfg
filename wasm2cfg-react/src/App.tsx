import React from 'react';
import './App.css';
import Flowchart from './components/Flowchart';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>Control Flow Graph (CFG) Visualization</h1>
        <Flowchart />
      </header>
    </div>
  );
}

export default App;
