import * as React from 'react';
import { DataGrid } from '@mui/x-data-grid';
import Button from '@mui/material/Button';
import { useState, useEffect } from 'react';
import ErrorBox from "./ErrorBox";

export default function DataGridUsers(props) {
  
  const [rows, setRows] = useState([]);
  const [deleteButtonError, setDeleteError] = useState('');
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
      headerName: 'User Type',
      width: 150,
      editable: true,
    }, 
    {
      field: 'username',
      headerName: 'Username',
      width: 110,
      editable: true,
    },
    {
      field: 'email',
      headerName: 'Email',
      sortable: false,
      width: 160,
      
    },
    {
      field: 'is_active',
      headerName: 'Is Active',
      sortable: true,
      width: 100
    },
    {
      field: 'col5',
      headerName: 'Delete User',
      width: 150,
      renderCell: (params) => {
         return <strong>
          <Button variant="contained" color="secondary" size="small" style={{marginLeft: 16}}
                  aria-label={'deleteUser' + params.row.id}
                  onClick={() => {
                    if (params.row.user_type === 'admin') {
                      setDeleteError("You cannot delete an admin");
                      return;
                    }
                    setDeleteError('');
                    props.apiHandler.deleteUser(params.row.id)
                    .then((res) => { 
                      setRows(rows.filter((user) => user.id !== params.row.id))
                    })
                    .catch((error) => {
                      setDeleteError("Server is not available. Try again later.");
                    })
                  }}>
            Delete User
          </Button>
        </strong>
      },
    }
  ];

  return (
    <div >
      <ErrorBox errorString={deleteButtonError}/>
      <DataGrid
        rows={rows}
        columns={columns}
        pusernameSize={5}
        rowsPerPusernameOptions={[5]}
        checkboxSelection
        disableSelectionOnClick
        style={{ height: "700px", widht: "100%"}}
        columnBuffer={7}
      />
    </div>
  );
}
 