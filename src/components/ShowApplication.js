import React, { Component } from "react";

class ShowApplication extends Component {

    state = {
        appData: ""
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
            appData: data
        })
        
    }
    



    render() {
      

        return (
            <>
            <div className="loan_details">
                Status: {this.state.appData.status}
                Submit Date: {this.state.appData.submit_date}
                Decision Date: {this.state.appData.decision_date}
                
            </div>
            </>
        )
    }
}
export default ShowApplication;