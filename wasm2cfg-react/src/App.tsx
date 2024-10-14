import React from 'react';
import './App.css';
import Flowchart from './components/Flowchart';
import Flowchart2 from './components/Flowchart2';
import MyCustomGraph from './components/MyCustomGraph'

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>Control Flow Graph (CFG) Visualization</h1>
        <Flowchart />
        <Flowchart2 />
        <MyCustomGraph />

      </header>
    </div>
  );
}

export default App;
