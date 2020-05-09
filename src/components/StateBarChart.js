import React, { Component } from "react"

import Chart from "chart.js"

class StateBarChart extends Component {

// class encapsulates the database call, data prep and rendering
// of the chart to the UI

prepareData = (data) => {

    let numApproved = 0;
    let numDeclined = 0;
    let numPending = 0;
    let numOther = 0; // catch all in case of data inconsistencies.

    const chartData = {
        // this is the x-axis label
        labels: ['approved', 'declined', 'pending'],
        // the groupings for the data being retrieved from the database.
        datasets: [
        {
        // label in the dataset = what is displayed onHover
            label: 'approved',
            data: [],
            // here's where we can specify some styling
            backgroundColor: 
            [
                'rgba(75, 192, 192, 0.2)',
                'rgba(255, 99, 132, 0.2)',
                'rgba(54, 162, 235, 0.2)'
            ]
        },
        {
            label: 'declined',
            data: []
        },
        {
            label: 'pending',
            data: []
        }   
        ]

    }
    
// iterate through each Application, 
// group data into datasets by status.
    data.forEach((application) => {
        // chartData.labels.push(application.status);
// need to push the item into the appropriate dataset based upon status.
// approved, declined, pending

        switch (application.status) {
            case 'approved':
               numApproved+=1;
               break;
            case 'declined':
                numDeclined+=1;
                break;
            case 'pending':
                numPending+=1;
                break;
            default: 
                console.log("Prepare Data - unrecognized status value");
                numOther+=1;
        }
        
    })

    chartData.datasets[0].data.push(numApproved);
    chartData.datasets[0].data.push(numDeclined);
    chartData.datasets[0].data.push(numPending);
    chartData.datasets[0].data.push(numOther);

    return chartData;
}

// specifies chart format and 
// renders in the canvas

createChart = (data) => {
    const ctx = document.querySelector("#barchart");
    const appChart = new Chart(ctx, {
        type: 'bar',
        data: data,
        options: {
            scales: {
                yAxes: [{
                    ticks: {
                        beginAtZero: true
                    }
                }]
            }
        }   
    })

}

// fetching data from our API
// pushing it to the items will format it 
// and ultimately display on the canvas.

getChartData = () => {
    // console.log(`GET CHART DATA ${this.props.baseURL}/applications`)

    // fetch(`${this.props.baseURL}/applications`)
    // .then((response) => response.json())
    // .then((jData) => console.log(jData))
    // .catch((error) => console.log(error));
    
    fetch(`${this.props.baseURL}/applications`)
    .then((response) => response.json())
    .then((jData) => this.prepareData(jData))
    .then((data) => this.createChart(data))
    .catch((err) => console.log(err));
}

// upon component mounting, trigger the cascade that hopefully
// results in a nice barchart on the screen
componentDidMount() {
    this.getChartData();
};

    render() {
        return(
            <>
            <h1>Applications By Status</h1>
            <canvas id="barchart" width="300" height="100"></canvas>
            </>
        )
    }
}

export default StateBarChart;