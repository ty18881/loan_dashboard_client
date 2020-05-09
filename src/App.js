import React from 'react';

// import './App.css';



import StateBarChart from './components/StateBarChart';
import AppByDateChart from './components/AppByDateChart';
import CreateBorrower from './components/CreateBorrower';

const baseURL = process.env.BASE_URL || "http://localhost:3000"

function App() {
  return (
   
    <>
    
    <div className="App">
      <StateBarChart 
        baseURL={baseURL}/>
        </div>
        <div>
      <AppByDateChart
        baseURL={baseURL} />
    </div>

    <div>
      <CreateBorrower
      baseURL={baseURL} />
    </div>
    </>
    
  );
}

export default App;
