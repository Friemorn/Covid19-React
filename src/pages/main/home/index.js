import React, { Component } from 'react'
import axios from 'axios'
import './home.css'
import CardStatus from '../../../components/card-status'
import Chart from '../../../components/chart'
import {Link} from 'react-router-dom'
import Pagination from '../../../components/pagination'
import Carousel from '../../../components/carousel'
const formatThousands = require('format-thousands')

export default class Home extends Component {
  constructor() {
    super()
    this.state = {
      globalStatus: {
        NewConfirmed: 0,TotalConfirmed: 0,NewDeaths: 0,TotalDeaths: 0,NewRecovered: 0,TotalRecovered: 0
      },
      countries: [],
      country: [],
      isLoading: false,
      currentPage: 1,
      perPage: 10
    }
  }

  getGlobalStatus() {
    this.setState({
      isLoading: true
    })
    axios.get('https://api.covid19api.com/summary')
    .then((res) => {
      this.setState({
        globalStatus: res.data.Global,
        countries: res.data.Countries.sort(),
        isLoading: false
      })
    })
  }
  getCountries() {
    this.setState({
      isLoading: true
    })
    axios.get('https://api.covid19api.com/countries')
    .then((res) => {
      this.setState({
        countries: res.data,
        isLoading: false
      })
    })
  }
  componentDidMount() {
    this.getGlobalStatus()
    this.getCountries()
  }

  render() {
    const { TotalConfirmed, TotalDeaths, TotalRecovered } = this.state.globalStatus
    const { currentPage, perPage } = this.state
    const indexOfLast = currentPage * perPage
    const indexOfFirst = indexOfLast - perPage
    const currentData = this.state.countries.slice(indexOfFirst, indexOfLast)
    const paginate = pageNum => this.setState({ currentPage: pageNum });
    const nextPage = () => this.setState({ currentPage: currentPage + 1 });
    const prevPage = () => this.setState({ currentPage: currentPage - 1 });
    return (
      <div className="container">
        <Carousel/>
        {this.state.isLoading && <h1>loading......</h1>}
        <header>
          <div className="row">
            <div className="col-md-3">
              <CardStatus
                title="Total Confirmed"
                TotalConfirmed={formatThousands(this.state.globalStatus.TotalConfirmed, '.')}
                color="blue"
              />
            </div>
            <div className="col-md-3">
              <CardStatus
                title="Total Deaths"
                TotalConfirmed={formatThousands(this.state.globalStatus.TotalDeaths, '.')}
                color="red"
              />
            </div>
            <div className="col-md-3">
              <CardStatus
                title="Total Recovered"
                TotalConfirmed={formatThousands(this.state.globalStatus.TotalRecovered, '.')}
                color="green"
              />
            </div>
            <div className="col-md-3">
              <CardStatus
                title="New Confirmed"
                TotalConfirmed={formatThousands(this.state.globalStatus.NewConfirmed, '.')}
                color="yellow"
              />
            </div>
            <div className="container-chart">
              <Chart labels={['Total Confirm', 'Total Death', 'Total Recovered']} data={[TotalConfirmed, TotalDeaths, TotalRecovered]}/>
            </div>
          </div>
        </header>

        <div className="country">
          <h1>List of All Countries</h1>
          <table className="table">
            <thead className="thead-dark">
              <tr>
                {/* <th scope="col">No. </th> */}
                <th scope="col" colSpan="2">Country</th>
              </tr>
            </thead>
            <tbody>
              {currentData.map((item, index) => 
                <tr>
                  {/* <th scope="row">{++index}</th> */}
                  <td>{item.Country}</td>
                  <td>
                    <Link to={`/countries/${item.Country}`}>
                      <img className="detail" src={require('../../../assets/view-details.png')} alt="detail"/>
                    </Link>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
          <Pagination perPage={perPage} totalData={this.state.countries.length} paginate={paginate} nextPage={nextPage} prevPage={prevPage} />
        </div>
      </div>
    )
  }
}
