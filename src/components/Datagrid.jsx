import * as React from 'react';
import { DataGrid } from '@mui/x-data-grid';
import Button from '@mui/material/Button';
import { useState, useEffect } from 'react';

export default function DataGridUsers(props) {
  
  const [rows, setRows] = useState([]);
  useEffect(() => {
    setRows(props.rows)
  }, [])
  
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
    },
    {
      field: 'col5',
      headerName: 'Name 5',
      width: 150,
      renderCell: (params) => {
         return <strong>
          <Button variant="contained" color="secondary" size="small" style={{marginLeft: 16}}
                  onClick={() => {
                    props.apiHandler.deleteUser(params.row.id)
                    .then((res) => { 
                      setRows(rows.filter((user) => user.id !== params.row.id))
                    })
                    .catch((error) => {
                      console.log(error)
                    })
                  }}>
            Delete User
          </Button>
        </strong>
      },
    }
  ];

  return (
    <div style={{ height: 400, width: '100%' }}>
      <DataGrid
        rows={rows}
        columns={columns}
        pusernameSize={5}
        rowsPerPusernameOptions={[5]}
        checkboxSelection
        disableSelectionOnClick
      />
    </div>
  );
}
 