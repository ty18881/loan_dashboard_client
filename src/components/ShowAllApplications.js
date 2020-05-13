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

        fetch(`${this.props.baseURL}applications`)
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

    // update state so the deleted item no longer appears on the screen
    // the change to state will trigger re-rendering the ShowAllApplications component.
    handleUpdateApplication = (application, id) => {
        console.log("Handle Update Appliation - congrats! you got to the callback!");
        const findIndex = this.state.appList.findIndex(application => application.id === id)
        const copyApplication = [...this.state.appList]
        // splice:  replace item at findIndex, replace a single item, put animal in the old item's place
        copyApplication.splice(findIndex, 1, application)
        this.setState({appList: copyApplication})
    
      }
    
      // update state when a new application is created so the component will re-render
      handleAddApplication = application => {
        const copyApplications = [...this.state.appList];
        copyApplications.unshift(application);
        this.setState({
          appList: copyApplications,
          currentApp: application
        });
      };

    handleDelete = (appId) => {
        console.log(`Removing App #: ${appId} from the state`);
        const findIndex = this.state.appList.findIndex(app => app.id === appId)
      const copyApp = [...this.state.appList]
      copyApp.splice(findIndex, 1)

      this.setState({
        appList: copyApp
      
    });
    console.log('Revised State', this.state.appList)
};

     // each application record is clickable.
    //onClick brings up the show route for the Application.

    toggleApplicationDetail = (app) => {
        
        console.log("toggle App Detail - REQUEST TO SHOW DETAIL DETECTED")
        console.log("Current Application ", app)
        console.log('Show Record Flag', this.state.showRecordDetail)

        this.setState({
            showRecordDetail: !this.state.showRecordDetail,
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
                baseURL={this.props.baseURL}
                handleDelete={this.handleDelete}/>
            : ""}
            </>
        )
    }
}
export default ShowAllApplications;