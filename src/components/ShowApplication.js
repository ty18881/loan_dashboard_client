import React, { Component } from "react";

class ShowApplication extends Component {

    state = {
        appData: "",
        loanData: []
    }

    fetchApplicationDetail = new Promise((resolve, reject) => {
        // console.log(`Fetch App Data for ${this.props.application_id}`)
        fetch(`${this.props.baseURL}/applications/${this.props.application_id}`)
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
    



    render() {

        // console.log(`Show App - Underlying Loan for ${this.state.appData.application_id} ${this.state.appData.loan}`);
    
        return (
            <>
            <div className="app_details">
                <hr></hr>
                Status: {this.state.appData.status}
                Submit Date: {this.state.appData.submit_date}
                Decision Date: {this.state.appData.decision_date}
                
            </div>
            <div className="loan_details">
                <h4>Loan Details</h4>
                
                {this.state.loanData.map((thisLoan,index) => (
                    <div key={thisLoan.id} className="loan">
                    <h4>Principal Amount: {thisLoan.principal_amount}</h4>
                    </div>
                    
                )
                   
                )}
            </div>
            <hr></hr>
            </>
        )
    }
}
export default ShowApplication;