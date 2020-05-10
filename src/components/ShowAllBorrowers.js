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

    // each borrower record is clickable.
    //onClick brings up the show route for the Borrower.

    toggleBorrowerDetail = (borrower) => {
        // console.log('SHOW BORROWER DETAIL', record);
        console.log("REQUEST TO SHOW DETAIL DETECTED")
        this.setState({
            showRecordDetail: !this.showRecordDetail,
            currentBorrower: borrower
        })
    }
    render() {

       
        return (
            <>
            <h1>Borrowers Requesting Relief</h1>
            {this.state.borrowerList.map( borrower => {
                return(
                    <div key={borrower.id} className="borrower">
                        {/* anon function here so showBorrowerDetail is only activated when the item is clicked. */}
                       <div className="borrower_link" onClick={() => {this.toggleBorrowerDetail(borrower)}}>{borrower.name} {borrower.state}</div> 
                      {/* if user has clicked on record, display show route for that item. */}
                    </div>
                )
            })}

            {this.state.showRecordDetail
            ? <ShowBorrower
                borrower={this.state.currentBorrower} 
                baseURL={this.props.baseURL}/>
            : () => {this.toggleBorrowerDetail(this.state.selectedBorrower)}}
            </>
        )
    }
}

export default ShowAllBorrowers;