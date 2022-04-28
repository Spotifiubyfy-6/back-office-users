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
    }, 
    {
      field: 'username',
      headerName: 'username',
      width: 110,
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
        if (params.row.user_type !== "admin") {
         return <strong>
          <Button variant="contained" color="secondary" size="small" style={{marginLeft: 16}}
                  aria-label={'deleteUser' + params.row.id}
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
        }
      },
    },
    {
      field: 'setAdmin',
      headerName: 'Set As Admin',
      width: 150,
      renderCell: (params) => {
        if (params.row.user_type !== "admin") {
         return <strong>
          <Button variant="contained" color="primary" size="small" style={{marginLeft: 16}}
                  aria-label={'setAsAdmin' + params.row.id}
                  onClick={() => {
                    props.apiHandler.setAsAdmin(params.row.id)
                    .then((res) => { 
                      console.log("NOW ADMIN")
                    })
                    .catch((error) => {
                      console.log(error)
                    })
                  }}>
            Set As Admin
          </Button>
        </strong>
        }
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
        columnBuffer={7}
      />
    </div>
  );
}
 