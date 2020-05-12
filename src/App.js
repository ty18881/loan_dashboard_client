import React, { Component } from 'react';

import './App.css';

import StateBarChart from './components/StateBarChart';
import AppByDateChart from './components/AppByDateChart';
import CreateBorrower from './components/CreateBorrower';
import CreateApplication from './components/CreateApplication';
import ShowAllBorrowers from './components/ShowAllBorrowers';
import ShowAllApplications from './components/ShowAllApplications';

const baseURL = process.env.BASE_URL || "http://localhost:3000"

class App extends Component {


  state = {
    name: "",
    state: "",
    business_segment: "",
    relationship_mgr_id: "",
    borrower_id: "",
    principal_amount: "",
    interest_rate: "",
    maturity_date: "",
    term: ""
  }

  handleFormClearing = () => {
    console.log('Added new Borrower - Clearing the Form input')
    this.setState({
      name: "",
      state: "",
    business_segment: "",
    relationship_mgr_id: ""
    })

  }

  // handle when items are deleted 
  // aiming for one method to do this for all models, may not get there.
  // perhaps accept model/component name and baseURL
  
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
   
  
    
    <div className="App">

      <div className="HolyGrail">


        <header><h1>2020 CARES ACT - Customer Relief Program Dashboard</h1> </header>

          <div className="HolyGrail-body">
                      {/* Center Panel */}
                      <main className="HolyGrail-content"> 
                          <h2>Application Statistics</h2>
                          <div className="chart-container">
                            <StateBarChart
                              baseURL={baseURL}
                            />
                          
                            <AppByDateChart
                              baseURL={baseURL}
                            />
                          </div>
                      </main>
 
                      {/* Left hand side panel */}
                      <nav className="HolyGrail-nav">
                            
                               <ShowAllBorrowers 
                                baseURL={baseURL} /> 
                            
                              <CreateBorrower
                                baseURL={baseURL} 
                                handleFormClearing={this.handleFormClearing}/>
                      </nav>

                    {/* Right Hand Side Panel */}

                    <aside className="HolyGrail-ads">
                            <ShowAllApplications
                              baseURL={baseURL} />

                        <CreateApplication
                        baseURL={baseURL} />
                    </aside>  

                    </div>


        <footer>Anon Bank - Internal Use Only</footer>
        {/* Close HOLYGRAIL div */}
      </div>  
       
      {/* Close APP div */}
    </div> 


  
    
  );
  }

  
}

export default App;
