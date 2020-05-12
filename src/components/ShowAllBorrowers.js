import React, { Component } from "react";

import "../App.css"
import ShowBorrower from "./ShowBorrower";
// this is the Borrower INDEX route.
// displays clickable list of Borrower records on the screen.
// using promises to ensure the fetch has returned prior to setting state.
class ShowAllBorrowers extends Component {

    state = {
        borrowerList: [],
        showRecordDetail: false,
        currentBorrower: {}
    }

    fetchBorrowerData = new Promise((resolve, reject) => {

        fetch(`${this.props.baseURL}/borrowers`)
        .then(response => response.json())
        .then( jData => {
            resolve(jData)
        })
        .catch((err) => console.log(err));

        
    });

    componentDidMount = async () => {
        
        let data = await this.fetchBorrowerData;

        console.log("Checking State ", data)
        this.setState({
            borrowerList: data
        })
        
    }

    
    handleUpdateBorrower = (borrower, id) => {
        console.log("Handle Update Borrower - congrats! you got to the callback!");
        const findIndex = this.state.borrowerList.findIndex(borrower => borrower.id === id)
        const copyBorrower = [...this.state.borrowerList]
        // splice:  replace item at findIndex, replace a single item, put animal in the old item's place
        copyBorrower.splice(findIndex, 1, borrower)
        this.setState({borrowerList: copyBorrower})
    
      }
    
    
      // newly added borrowers added to state so the component will re-render
      handleAddBorrower = borrower => {
        const copyBorrowers = [...this.state.borrowerList];
        copyBorrowers.unshift(borrower);
        this.setState({
          borrowerList: copyBorrowers,
          currentApp: borrower
        });
      };

    // each borrower record is clickable.
    //onClick brings up the show route for the Borrower.

    toggleBorrowerDetail = (borrower) => {
        // console.log('SHOW BORROWER DETAIL', record);
        console.log("Toggle Borrower - REQUEST TO SHOW DETAIL DETECTED")
        
        this.setState({
            showRecordDetail: !this.showRecordDetail,
            currentBorrower: borrower
        })
    }

   

    render() {

       
        return (
            <>
            <h2>Borrowers Requesting Relief</h2>
            {this.state.borrowerList.map( borrower => {
                return(
                    <div key={borrower.id} className="borrower">
                        {/* anon function here so showBorrowerDetail is only activated when the item is clicked. */}
                       <div className="borrower_link" onClick={() => {this.toggleBorrowerDetail(borrower)}}>{borrower.name}</div> 
                      {/* if user has clicked on record, display show route for that item. */}
                    </div>
                )
            })}

            {this.state.showRecordDetail
            ? <ShowBorrower
                borrower={this.state.currentBorrower} 
                baseURL={this.props.baseURL}
                handleUpdateBorrower={this.handleUpdateBorrower}/>
            : ""}
            </>
        )
    }
}

export default ShowAllBorrowers;