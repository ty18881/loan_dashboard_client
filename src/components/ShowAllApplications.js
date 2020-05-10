import  React,{ Component } from 'react';

import ShowApplication from './ShowApplication';
// responsible for implementing the INDEX route for Applications
// Renders a clickable link for each application that has been submitted for consideration.
// fetches data from the database and renders to the screen.
// click leads to show and update routes for each application.


class ShowAllApplications extends Component {

    // the logic to retrieve data from the database

    state = {
        appList: [],
        showRecordDetail: false,
        currentApp: {}
    }

    fetchApplicationData = new Promise((resolve, reject) => {

        fetch(`${this.props.baseURL}/applications`)
        .then(response => response.json())
        .then( jData => {
            resolve(jData)
        })
        .catch((err) => console.log(err));

        
    });

    componentDidMount = async () => {
        
        let data = await this.fetchApplicationData;

        console.log("All Apps: ", data)
        this.setState({
            appList: data
        })
        
    }

     // each application record is clickable.
    //onClick brings up the show route for the Application.

    toggleApplicationDetail = (app) => {
        
        console.log("toggle App Detail - REQUEST TO SHOW DETAIL DETECTED")
        let toggleShow = false;
        this.state.showRecordDetail ? this.setState({ showRecordDetail: toggleShow}) : this.setState({ showRecordDetail: !toggleShow});
        this.setState({
            currentApp: app
        })
    }
    render() {

        return(
            <>
            <h2>Deferral Applications</h2>
            {this.state.appList.map( (app, index) => (
                    <div key={app.id} className="application">
                        {/* anon function here so showBorrowerDetail is only activated when the item is clicked. */}
                       <div className="app_link" onClick={() => {this.toggleApplicationDetail(app)}}>App ID: {app.id} Borrower ID: {app.borrower_id}</div> 
                      {/* if user has clicked on record, display show route for that item. */}
                    </div>
            
            ))}

            {this.state.showRecordDetail
            ? <ShowApplication
                app={this.state.currentApp} 
                application_id={this.state.currentApp.id}
                baseURL={this.props.baseURL}/>
            : () => {this.toggleApplicationDetail(this.state.selectedApp)}}
            </>
        )
    }
}
export default ShowAllApplications;