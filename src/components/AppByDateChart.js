import React, { Component } from "react"

import Chart from "chart.js"

class AppByDateChart extends Component {

// class encapsulates the database call, data prep and rendering
// of the chart to the UI

prepareData = (inputData) => {


    const chartData = {
        // this is the x-axis label - these will be the collection of application submit_dates
        labels: [],
        // the groupings for the data being retrieved from the database.
        datasets: [
        {
        // label in the dataset = what is displayed onHover
            label: '# of applications submitted',
            data: [],
            // // here's where we can specify some styling
            // backgroundColor: 
            // [
            //     'rgba(75, 192, 192, 0.2)',
            //     'rgba(255, 99, 132, 0.2)',
            //     'rgba(54, 162, 235, 0.2)'
            // ]
        }
        
        ]

    }
    
// this route returns an Object
// key = date, value = # applications submitted on that date
// Object.values returns an array of all the values in the object.
    for (let [key, value] of Object.entries(inputData)) {
   
// console.log(`Key = ${key} Value = ${value}`);
        // push the submit_date to the labels array for the chartData collection.
        chartData.labels.push(key)

        // push the count into the data array.
        chartData.datasets[0].data.push(value);
        
// I structured the data such that it returns submit_date and the # of records submitted on that date 
// when we hit this route.
// very hacky and data is denormalized but optimizes the UI portions.
   
        
    }

    return chartData;
}

// specifies chart format and 
// renders in the canvas

createChart = (data) => {
    const ctx = document.querySelector("#subbydate");
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
    

    // fetch(`${this.props.baseURL}/applications`)
    // .then((response) => response.json())
    // .then((jData) => console.log(jData))
    // .catch((error) => console.log(error));
    
    fetch(`${this.props.baseURL}appsubmits`)
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
            {/* <h3>Applications By Submission Date</h3> */}
            <canvas id="subbydate" width="200" height="100"></canvas>
            </>
        )
    }
}

export default AppByDateChart;