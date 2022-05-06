import * as React from 'react';
import { DataGrid } from '@mui/x-data-grid';
import Button from '@mui/material/Button';
import { useState, useEffect } from 'react';
import ErrorBox from "./ErrorBox";
import ImageButton from "./Datagrid/ImageButton"

const image_src = "https://www.seekpng.com/png/detail/966-9665493_my-profile-icon-blank-profile-image-circle.png"

function handleViewUserButtonClick(params) {
    params.apiHandler.getUserInfoWithId(params.id)
   .then((res) => {

    }).catch((err) => {
        params.setError("Server is not available. Try again later.");
    });
}

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
      width: 90
    },
    {
        field: 'viewUser',
        headerName: 'View User',
        width: 90,
        renderCell: (params) => {
                const funcParams = {
                    id: params.id,
                    apiHandler: props.apiHandler,
                    setError: setDeleteError
                }
                return <strong>
                    <ImageButton onClick={handleViewUserButtonClick} params={funcParams}
                                 src={image_src} height="40" width="40" alt={"View User"}
                                 arialLabel={'viewUser' + params.row.id}/>
                </strong>;
        },
    },
    {
      field: 'user_type',
      headerName: 'User Type',
      width: 150,
    }, 
    {
      field: 'username',
      headerName: 'Username',
      width: 110,
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
        if (params.row.user_type !== "admin") {
         return <strong>
          <Button variant="contained" color="secondary" size="small" style={{marginLeft: 16}}
                  aria-label={'deleteUser' + params.row.id}
                  onClick={() => {
                    props.apiHandler.deleteUser(params.row.id)
                    .then((res) => {
                        window.location.reload(false);
                    })
                    .catch((error) => {
                      setDeleteError("Server is not available. Try again later.");
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
                  aria-label={'setUser' + params.row.id + 'AsAdmin'}
                  onClick={() => {
                    props.apiHandler.setAsAdmin(params.row.id)
                    .then((res) => { 
                       window.location.reload(false);
                    })
                    .catch((error) => {
                        setDeleteError("Server is not available. Try again later.");
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
        columnBuffer={10}
      />
    </div>
  );
}
 