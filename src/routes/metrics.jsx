import React from 'react';
import LineChartWithMonthSelector from "../components/Metrics/LineChartWithMonthSelector"
import "../components/Metrics/style.css"

export default function metrics(props) {
  if (!props.apiHandler)
    console.log("eeee");
  return (
  <div className="container">
    <div className="row">
      <div> <LineChartWithMonthSelector xTitle={'Days ago'} yTitle={'Quantity of LogIns'}
                                        title={'LogIns with user and password'}
          width={750} height={200} apiHandler={props.apiHandler} metrics_id={1}/> </div>
    </div>
  </div>);
}
