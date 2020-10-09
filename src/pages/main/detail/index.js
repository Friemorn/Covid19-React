import React, {useState, useEffect} from 'react'
import axios from 'axios'
import moment from 'moment'
import Chart from '../../../components/chart-country'
import './detail.css'

export default function Detail(props) {
  const [localStatus, setlocalStatus] = useState([])

  useEffect(() => {
    axios.get(`https://api.covid19api.com/live/country/${props.match.params.country}`)
    .then((res)=>{
      setlocalStatus(res.data)
    })
    // console.log(localStatus)
  },[])

  // console.log(props)
  console.log(localStatus)
  return (
    <div className="container">
      <h1 className="country-name">{props.match.params.country}</h1> <br/>
      <div onClick={()=> props.history.goBack()}><img className="back" src={require('../../../assets/back.png')} alt="back"/></div>
      <div className="container-chart">
        <Chart
        labels={ localStatus.map((item) => moment(item.Date).format('L'))}
        dataConfirmed={ localStatus.map((item) => item.Confirmed) }
        dataActive={ localStatus.map((item) => item.Active) }
        dataDeath={ localStatus.map((item) => item.Deaths) }
        dataRecovered={ localStatus.map((item) => item.Recovered) }
        />
      </div>
      <div className="country">
        <h1>List of Case from {props.match.params.country}</h1>
        <table className="table">
          <thead className="thead-dark">
            <tr>
              <th scope="col">No. </th>
              <th scope="col">Date</th>
              <th scope="col">Confirmed</th>
              <th scope="col">Active</th>
              <th scope="col">Death</th>
              <th scope="col">Recovered</th>
            </tr>
          </thead>
          <tbody>
            {localStatus.map((item, index) => 
              <tr>
                <th scope="row">{++index}</th>
                <th>{moment(item.Date).format('ll')}</th>
                <th>{item.Confirmed}</th>
                <th>{item.Active}</th>
                <th>{item.Deaths}</th>
                <th>{item.Recovered}</th>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  )
}
