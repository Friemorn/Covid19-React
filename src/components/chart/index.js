import React, { Component } from 'react'
import Doughtnut from 'react-chartjs-2'
import './chart.css'

export default class Chart extends Component {
  constructor(props) {
    super()
    this.state = {
      dataChart: {
        datasets: [
          {
            backgroundColor: [
                'rgba(130, 200, 255, 0.2)',
                'rgba(255, 160, 170, 0.2)',
                'rgba(200, 255, 100, 0.2)',
            ],
            borderColor: [
                'rgba(130, 200, 255, 1)',
                'rgba(255, 160, 170, 1)',
                'rgba(200, 255, 100, 1)',
            ],
            borderWidth: 1
          }
        ]
      }
    }
  }
  render() {
    const dataChart = this.state.dataChart
    dataChart.labels = this.props.labels
    dataChart.datasets[0].data = this.props.data
    return (
      <div className="container-total-chart">
        <Doughtnut data={dataChart}/>
      </div>
    )
  }
}