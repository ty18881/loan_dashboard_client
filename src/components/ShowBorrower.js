import React, { Component } from "react";

import ShowApplication from './ShowApplication';

// this component displays a borrower record
// did we want to show the any outstanding applications at this level?
// if so, might need another DB call to retrieve that data.
// we could modify the Borrower SHOW route to return the Application and underlying Loan data in one shot.

class ShowBorrower extends Component {

    state = {
        showAppDetail: false,
        appData: {}
    }

    handleToggleShowDetail =() => {
        this.setState({ showAppDetail: false});
    };


   

    render() {
        return (
            <>
            <hr></hr>
            <h4>{this.props.borrower.name} Detail Record</h4>
            <h5>Segment:  {this.props.borrower.business_segment}  State:  {this.props.borrower.state}  Borrower ID: {this.props.borrower.id}</h5>
            {this.props.borrower.application_id
                ? <button className="form_button" onClick={ () => {this.setState({showAppDetail: true})}}>Show Borrower Application Detail</button>
                : <h4>No Application On File</h4>
            }
           {/* Here's where we render the application component if the user elects to view application details */}

           {this.state.showAppDetail
           ?  <ShowApplication
                handleToggleShowDetail={this.handleToggleShowDetail}
                application_id={this.props.borrower.application_id} 
                baseURL={this.props.baseURL}/>
            : <div></div> }
            </>
        )
    }
}
export default ShowBorrower;