import React from 'react';
import LineChartWithMonthSelector from "../components/Metrics/LineChartWithMonthSelector"
import "../components/Metrics/style.css"
import { DataGrid } from '@mui/x-data-grid';
import { useState } from 'react';
import { useEffect } from 'react';

const transactionColumns = [
  { 
    field: 'type',
    headerName: 'Type',
    width: 90
  },
  {
      field: 'sender_id',
      headerName: 'Sender Id',
      width: 90
  },
  {
    field: 'amount',
    headerName: 'amount',
    width: 90,
  }, 
  {
    field: 'receiver_id',
    headerName: 'receiver Id',
    width: 90,
  },
  {
    field: 'transaction_id',
    headerName: 'Transaction Id',
    sortable: false,
    width: 90,
    
  },
  {
    field: 'time',
    headerName: 'time',
    sortable: true,
    width: 90
  }
];

export default function Metrics(props) {
  const [rows, setRows] = useState([]);

  useEffect(() => {
    props.apiHandler.getTransactions()
            .then((res) => {
                setRows(res.data);
            }
            ).catch((err)=>console.log(err));
  }
  ,[]);
  return (
  <div className="container">
    <div className="row">
      <div> <LineChartWithMonthSelector xTitle={'Days ago'} yTitle={'Quantity of new users'}
                                        title={'Users created'} color={'rgb(20, 10, 255)'}
                                        width={750} height={200} apiHandler={props.apiHandler} metrics_id={1}/> </div>
      <div> <LineChartWithMonthSelector xTitle={'Days ago'} yTitle={'Quantity of LogIns'}
                                        title={'LogIns with user and password'} color={'rgb(255, 99, 132)'}
          width={750} height={200} apiHandler={props.apiHandler} metrics_id={2}/> </div>
    </div>
    <div className="row">
    <DataGrid
                    rows={rows}
                    columns={transactionColumns}
                    rowsPerPusernameOptions={[5]}
                    checkboxSelection
                    disableSelectionOnClick
                    getRowId={(row) => row.time}
                    style={{ height: "300px", widht: "100%"}}
                    columnBuffer={10}
                />
                </div>
  </div>);
}
