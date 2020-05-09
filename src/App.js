import React from 'react';

import './App.css';
import StateBarChart from './components/StateBarChart';

const baseURL = process.env.BASE_URL || "http://localhost:3000"

function App() {
  return (
    <div className="App">
      <StateBarChart 
        baseURL={baseURL}/>
    </div>
  );
}

export default App;
