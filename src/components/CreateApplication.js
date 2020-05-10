import React, { Component } from "react";

// this component is used to create a new application in the database.
// CRITICAL ELEMENT: It must be linked to an existing borrower in our database.
// SUBMIT_DATE
// STATUS:
// BORROWER_ID:

// 
class CreateApplication extends Component {

    handleInputChange = (event) => {
        console.log("NEW Application - Handling Input")

        this.setState({
            [event.target.id]: event.target.value
        });
    };

    handleSubmit = (event) => {
     console.log("HANDLE SUBMIT - Current State", this.state);

        console.log("HANDLE SUBMIT - Base URL", `${this.props.baseURL}/applications`)
                event.preventDefault();
                   
                fetch(`${this.props.baseURL}/applications`, {
                    method: "POST",
                    body: JSON.stringify({
                        borrower_id: this.state.borrower_id,
                        principal_amount: this.state.principal_amount,
                        interest_rate: this.state.interest_rate,
                        maturity_date: this.state.maturity_date,
                        term: this.state.term
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
                        borrower_id: "",
                        principal_amount: "",
                        interest_rate: "",
                        maturity_date: "",
                        term: ""
                    })
                })
                .catch(error => console.error({ Error: error}));
        
    };

    render () {
        return(
            <>
            <div className="create_application">
            <h1>Start a new loan relief application here.</h1>
            <form onSubmit={this.handleSubmit}>
            <label htmlFor="borrower_id"></label>
            <input 
                type="text"
                id="borrower_id"
                name="borrower_id"
                onChange={this.handleInputChange}
                placeholder="Borrower Id #"
            />
            
{/* collecting the new loan components here. */}
            <label htmlFor="principal_amount"></label>
            <input 
                type="text"
                id="principal_amount"
                name="principal_amount"
                onChange={this.handleInputChange}
                placeholder="principal amount in dollars"
            />
            <label htmlFor="interest_rate"></label>
            <input 
                type="text"
                id="interest_rate"
                name="interest_rate"
                onChange={this.handleInputChange}
                placeholder="current interest rate"
            />
            <label htmlFor="maturity_date"></label>
            <input 
                type="text"
                id="maturity_date"
                name="maturity_date"
                onChange={this.handleInputChange}
                placeholder="Maturity date: YYYY-MM-DD"
            />
            <label htmlFor="term"></label>
            <input 
                type="text"
                id="term"
                name="term"
                onChange={this.handleInputChange}
                placeholder="how many years until the loan matures?"
            />

            <button className="addbutton" value="submit">Create Application</button>
         </form>

         </div>
            </>
        );
    }
}

export default CreateApplication;