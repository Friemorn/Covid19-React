import React, { Component } from 'react'
import { Line } from 'react-chartjs-2';
import './chart-country.css'

export default class Chart extends Component {
  constructor(props) {
    super()
    this.state = {
      dataChart: {
        datasets: [
          {
            label: 'Confirmed',
            borderColor: [
                'rgba(130, 200, 255, 1)'
            ],
            borderWidth: 3,
            fill: false
          },
          {
            label: 'Active',
            borderColor: [
                'rgba(255, 255, 0, 1)'
            ],
            borderWidth: 3,
            fill: false
          },
          {
            label: 'Death',
            borderColor: [
                'rgba(255, 160, 170, 1)'
            ],
            borderWidth: 3,
            fill: false
          },
          {
            label: 'Recovered',
            borderColor: [
                'rgba(200, 255, 100, 1)'
            ],
            borderWidth: 3,
            fill: false
          }
        ]
      }
    }
  }
  render() {
    const dataChart = this.state.dataChart
    dataChart.labels = this.props.labels
    dataChart.datasets[0].data = this.props.dataConfirmed
    dataChart.datasets[1].data = this.props.dataActive
    dataChart.datasets[2].data = this.props.dataDeath
    dataChart.datasets[3].data = this.props.dataRecovered
    return (
      <div className="container-total-chart">
        <Line data={dataChart}/>
      </div>
    )
  }
}