import React, { Component } from "react";

// this component displays a borrower record
// did we want to show the any outstanding applications at this level?
// if so, might need another DB call to retrieve that data.
// we could modify the Borrower SHOW route to return the Application and underlying Loan data in one shot.

class ShowBorrower extends Component {

    showApplicationDetail = () => {
        console.log("ShowBorrower Component - DISPLAYING APPLICATION DETAIL FOR GIVEN BORROWER");
    }
    
    render() {
        return (
            <>
            <hr></hr>
            <h4>{this.props.borrower.name} Detail Record</h4>
            <h5>Segment:  {this.props.borrower.business_segment}  State:  {this.props.borrower.state}</h5>
            <button className="form_button" onClick={this.showApplicationDetail}>Show Borrower Application Detail</button>
            {/* <button className="form_button" onClick={this.props.updateRecord(this.props.borrower.id)}>Delete Borrower Record</button> */}
            </>
        )
    }
}
export default ShowBorrower;