import React from 'react';
import LineChartWithMonthSelector from "../components/Metrics/LineChartWithMonthSelector"
import "../components/Metrics/style.css"

export default function metrics(props) {
  return (
  <div className="container">
    <div className="row">
      <div> <LineChartWithMonthSelector xTitle={'Days ago'} yTitle={'Quantity of LogIns'}
                                        title={'LogIns with user and password'} color={'rgb(255, 99, 132)'}
          width={750} height={200} apiHandler={props.apiHandler} metrics_id={1}/> </div>
    </div>
  </div>);
}
