import React, { Component } from "react";

// this component is used to create a new application in the database.
// CRITICAL ELEMENT: It must be linked to an existing borrower in our database.
// SUBMIT_DATE
// STATUS:
// BORROWER_ID:

// 
class CreateApplication extends Component {

    render () {
        return(
            <>
            <h1>Start a new loan relief application here.</h1>
            <form onSubmit={this.handleSubmit}>
            <label htmlFor="borrower"></label>
            <input 
                type="text"
                id="borrower"
                name="borrower"
                onChange={this.handleInputChange}
                placeholder="Borrower Id #"
            />
            
{/* collecting the new loan components here. */}
            <label htmlFor="principal"></label>
            <input 
                type="text"
                id="principal"
                name="principal"
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
            <label htmlFor="years_to_maturity"></label>
            <input 
                type="text"
                id="years_to_maturity"
                name="years_to_maturity"
                onChange={this.handleInputChange}
                placeholder="how many years until the loan matures?"
            />

            <button className="addbutton" value="submit">Create Application</button>
         </form>
            </>
        );
    }
}

export default CreateApplication;