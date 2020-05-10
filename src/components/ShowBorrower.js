import React, { Component } from "react";

// this component displays a borrower record
// did we want to show the any outstanding applications at this level?
// if so, might need another DB call to retrieve that data.
// we could modify the Borrower SHOW route to return the Application and underlying Loan data in one shot.

class ShowBorrower extends Component {

    getApplicationDetail = (appId) => {
        console.log("ShowAllBorrower Component - Request for Application Details");
        fetch(`${this.props.baseURL}/applications/${appId}`)
        .then((response) => response.json())
        .then((jData) => console.log(jData))
         .catch((error) => console.log(error));
    }
    
    render() {
        return (
            <>
            <hr></hr>
            <h4>{this.props.borrower.name} Detail Record</h4>
            <h5>Segment:  {this.props.borrower.business_segment}  State:  {this.props.borrower.state}</h5>
            {this.props.borrower.application_id
                ? <button className="form_button" onClick={ () => {this.getApplicationDetail(this.props.borrower.application_id)}}>Show Borrower Application Detail</button>
                : <h4>No Application On File</h4>
            }
            </>
        )
    }
}
export default ShowBorrower;