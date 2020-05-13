# Customer Assistance Program - Deferral Application Dashboard

# SEIR-FLEX-123  Project Number Four - May 2020
This project simulates a leadership dashboard that would be used to track
applications for loan payment deferrals coming into our fictional bank.

Primary user is a loan administrator who has permission to view all loan data and update data on file as needed.

## This project utilizes the following technologies under the hood:
- React
- Ruby
- Rails
- Postgresql
- Chart.js
- Faker on the backend to create simulated loan data

## The application URL
https://loan-dashboard-client.herokuapp.com/

## Future Refinements
- Use Rails Active Record dependencies more elegantly, especially for creating loans attached to deferral applications.
- Leverage Context to avoid passing props down multiple component levels.
- Leverage join tables to simplify or optimize data for creating graphs.
- Re-render graphs as applications are added or deleted.
- Display borrowers without applications in Italics on the INDEX route.
- Borrower and Application SHOW routes render in the middle of the screen under the graphs.
- Mobile friendly?  What's that?

## Defects / "Would be better if" Items
- Refresh state when new borrowers or applications are added

## Trello Board
https://trello.com/b/ZHn4yL5m/loan-dashboard-application

## Wireframes

### Dashboard View
![Dashboard Wireframe](/assets/images/Loan-Data-Dashboard-Wireframe.png "Dashboard View")

### Entity-Relationship Diagram
![ER Diagram](/assets/images/Application-Routing-Wireframe.png "Entity-Relationship Diagram")