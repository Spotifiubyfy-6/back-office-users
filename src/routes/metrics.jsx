import React from 'react';
import LineChartWithTextField from "../components/Metrics/LineChartWithTextField"
import "../components/Metrics/style.css"

export default function metrics() {
  return (
  <div className="container">
    <div className="row">
      <div> <LineChartWithTextField width={750} height={200}/> </div>
    </div>
  </div>);
}
