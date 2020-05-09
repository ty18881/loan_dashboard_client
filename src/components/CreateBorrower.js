import React, { Component } from "react"

// this component is used to create a new Borrower record in our database.

// collect form data.
// PUT form data to our database.
// return some message to the UI indicating a successful addition.
// NAME:string
// STATE: two char abbreviation
// BUS SEG:  CRE, Energy, Multifamily, Regional Bank, etc.
// REL MGR:  1, 2


// need to handle when the user clicks submit.
// need to capture data from the input form.
// base URL will be passed in as a prop

class CreateBorrower extends Component {

    // capture user input in state as it's being typed.
    handleInputChange = (event) => {
        console.log("NEW Borrower - Handling Input")

        this.setState({
            [event.target.id]: event.target.value
        });
    };

    // submit form data to the database.
// OPEN QUESTION:  how to I enumerate through
// the state variables?  versus calling them by name below...
// also clear the form data once the submit has happened

handleSubmit = (event) => {
    // console.log("HANDLE SUBMIT - ", event);
    console.log("HANDLE SUBMIT - Base URL", `${this.props.baseURL}/borrowers`)
            event.preventDefault();
               
            fetch(`${this.props.baseURL}/borrowers`, {
                method: "POST",
                body: JSON.stringify({
                    name: this.state.name,
                    state: this.state.stateabbr,
                    business_segment: this.state.busseg,
                    relationship_mgr_id: this.state.relmgr
                }),
                headers: {
                    "Content-Type": "application/json"
                }
            })
            .then(res => res.json())
            .then(resJson => {
                console.log("HANDLE SUBMIT - attempting to clear the form")
                console.log(resJson);
                this.setState({
                    name: "",
                    state: "",
                    business_segment: "",
                    relationship_mgr_id: ""
                })
            })
            .catch(error => console.error({ Error: error}));
    
        };

    render() {
        return (
            <>

         <form onSubmit={this.handleSubmit}>
            <label htmlFor="name"></label>
            <input 
                type="text"
                id="name"
                name="name"
                onChange={this.handleInputChange}
                placeholder="Business Name"
            />
            <label htmlFor="stateabbr"></label>
            <input 
                type="text"
                id="stateabbr"
                name="stateabbr"
                onChange={this.handleInputChange}
                placeholder="State Abbreviation"
            />

            <label htmlFor="busseg"></label>
            <input 
                type="text"
                id="busseg"
                name="busseg"
                onChange={this.handleInputChange}
                placeholder="Business Segment"
            />

            <label htmlFor="relmgr"></label>
            <input 
                type="text"
                id="relmgr"
                name="relmgr"
                onChange={this.handleInputChange}
                placeholder="Relationship Mgr id"
            />

            <button className="addbutton" value="submit">Add Borrower</button>
         </form>

         </>

        )
    }
}

export default CreateBorrower;