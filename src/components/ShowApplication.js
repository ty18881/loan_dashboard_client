import React, { Component } from "react";
import UpdateApplication from "./UpdateApplication";



// this class encapsulates the SHOW route for the Application model
// will include opportunity to delete the item from the database
// as well is revise the current record.

// should also trigger removal of the application from the UX when it gets deleted
// means sending a method to update App.js' state down through several levels
class ShowApplication extends Component {

    state = {
        appData: "",
        loanData: [],
        renderEditComponent: false
    }

    fetchApplicationDetail = new Promise((resolve, reject) => {
        // console.log(`Fetch App Data for ${this.props.application_id}`)
        fetch(`${this.props.baseURL}applications/${this.props.application_id}`)
        .then(response => response.json())
        .then( jData => {
            resolve(jData)
        })
        .catch((err) => console.log(err));

        
    });

    componentDidMount = async () => {
        
        let data = await this.fetchApplicationDetail;

        // console.log("Checking State ", data)
        this.setState({
            appData: data,
            loanData: data.loan
        })
        
        console.log("Show App - Details", this.state.appData);
    }
    
// handle user request to delete an application from the database
// complexity is limited to the database, thank heaven!

    deleteApplication = (appId) => {
        console.log(`Received request to delete application ${appId}`);
        fetch(`${this.props.baseURL}/applications/${appId}`, {
            method: 'DELETE'
        })
        .then( response => {
            console.log(`Application ${appId} removed`);
            console.log("App Delete - Updating State");
            this.props.handleDelete(appId);
        })
        .catch((error) => console.error({Error: error}));

    }

    // handle user request to modify the application
    toggleEditForm = (currApp) => {
        // console.log('SHOW BORROWER DETAIL', record);
        console.log("Toggle Borrower - REQUEST TO SHOW DETAIL DETECTED")
        
        this.setState({
            renderEditComponent: !this.state.renderEditComponent
            
        })
        console.log("State -Render Component", this.state.renderEditComponent)
    }
   

    render() {

        // console.log(`Show App - Underlying Loan for ${this.state.appData.application_id} ${this.state.appData.loan}`);
    
        return (
            <>
            <div className="app_details">
                <hr></hr>
                <h5>Status: {this.state.appData.status}</h5>
                <h5>Submit Date: {this.state.appData.submit_date}</h5>
                Decision Date: {this.state.appData.decision_date}
                
            </div>
            <div className="loan_details">
                <h5>Loan Details</h5>
                
                {this.state.loanData.map((thisLoan,index) => (
                    <div key={thisLoan.id} className="loan">
                    <h6>Principal Amount: {thisLoan.principal_amount}</h6>
                    </div>
                    
                )
                   
                )}
            </div>
            <div className="delete_loan">

                <button className="delete_button" onClick={() => {this.deleteApplication(this.state.appData.id)}}>Delete Application</button>
                <button className="update_button" onClick={()=> this.toggleEditForm()}>Update Application</button>
            </div>
            <hr></hr>

            

            {this.state.renderEditComponent
            ? <UpdateApplication
                baseURL={this.props.baseURL}
                appData={this.state.appData}
                />
            : ""
            }
            </>
        )
    }
}
export default ShowApplication;