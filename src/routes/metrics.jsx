import React from 'react';
import LineChartWithTextField from "../components/Metrics/LineChartWithTextField"
import "../components/Metrics/style.css"

export default function metrics(props) {
  if (!props.apiHandler)
    console.log("eeee");
  return (
  <div className="container">
    <div className="row">
      <div> <LineChartWithTextField width={750} height={200} apiHandler={props.apiHandler} metrics_id={1}/> </div>
    </div>
  </div>);
}
