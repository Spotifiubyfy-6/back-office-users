import * as React from 'react';
import { DataGrid } from '@mui/x-data-grid';


const columns = [
  { 
    field: 'id',
    headerName: 'ID',
    width: 90 },
  {
    field: 'user_type',
    headerName: 'user_type',
    width: 150,
    editable: true,
  },
  {
    field: 'username',
    headerName: 'username',
    width: 110,
    editable: true,
  },
  {
    field: 'email',
    headerName: 'email',
    sortable: false,
    width: 160,
    
  },
  {
    field: 'is_active',
    headerName: 'is_active',
    sortable: true,
    width: 100
  }
];


export default function DataGridUsers(props) {
  
  return (
    <div style={{ height: 400, width: '100%' }}>
      <DataGrid
        rows={props.rows}
        columns={columns}
        pusernameSize={5}
        rowsPerPusernameOptions={[5]}
        checkboxSelection
        disableSelectionOnClick
      />
    </div>
  );
}
