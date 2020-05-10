import React, { Component } from 'react';

// import './App.css';



import StateBarChart from './components/StateBarChart';
import AppByDateChart from './components/AppByDateChart';
import CreateBorrower from './components/CreateBorrower';
import CreateApplication from './components/CreateApplication';
import ShowAllBorrowers from './components/ShowAllBorrowers';

const baseURL = process.env.BASE_URL || "http://localhost:3000"

class App extends Component {

  // handle when items are deleted 
  
  handleDelete = (id) => {
    console.log("delete clicked" + id);
    fetch(baseURL + '/applications/' + id, {
      method: 'DELETE'
    }).then( response => {
      // const findIndex = this.props.giggleLibs.findIndex(giggleLibs => giggleLibs._id === id)
      // const copyLib = [...this.props.giggleLibs]
      // copyLib.splice(findIndex, 1)
      // this.setState({
      //   giggleLibs: copyLib
      // })
      console.log("delete complete")
    })
    .catch(err => console.log(err));
  }

  render () {
  return (
   
    <>
    
    <div className="App">
      <div className="borrower_list">
      <ShowAllBorrowers 
        baseURL={baseURL} />
        
      </div>
     
      <div className="new_borrower_form">
      <CreateBorrower
      baseURL={baseURL} />
    </div>

      <CreateApplication
        baseURL={baseURL} />

      <StateBarChart 
        baseURL={baseURL}/>
        </div>
        <div>
      <AppByDateChart
        baseURL={baseURL} />
    </div>

   
    </>
    
  );
  }
}

export default App;
