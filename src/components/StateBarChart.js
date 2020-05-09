import React, { Component } from "react"

import Chart from "chart.js"

class StateBarChart extends Component {

// class encapsulates the database call, data prep and rendering
// of the chart to the UI

getChartData = () => {
    console.log("GET CHART DATA ", this.props.baseURL)
    fetch(this.props.baseURL + "/applications")
    .then((response) => response.json())
    .then((jData) => console.log(jData))
    .catch((err) => console.log(err));
}

    render() {
        return(
            <>
            <h1>Greetings from the StateBarChart Component!</h1>
            <div>Chart Data {this.getChartData()}</div>
            </>
        )
    }
}

export default StateBarChart;