import * as React from 'react';
import { DataGrid } from '@mui/x-data-grid';
import Button from '@mui/material/Button';
import { useState, useEffect } from 'react';
import ErrorBox from "./ErrorBox";
import ImageButton from "./Datagrid/ImageButton"
import UserProfileButton from "./Datagrid/UserProfileButton";
import { TextField } from '@mui/material';
import BasicModal from './ModalFunds';

export default function DataGridUsers(props) {

  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [rows, setRows] = useState([]);
  const [deleteButtonError, setDeleteError] = useState('');
  const [userInfo, setUserInfo] = useState(null);
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
                    <UserProfileButton funcParams={funcParams}/>
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
      field: 'delete_user',
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
    },
    {
      field: 'blockUser',
      headerName: 'Block User',
      width: 150,
      renderCell: (params) => {
        if (params.row.user_type !== "admin") {
          if (params.row.is_active) {
            return (<strong>
              <Button variant="contained" color="error" size="small" style={{marginLeft: 16, width: '100%'}}
                      aria-label={'blockUser' + params.row.id}
                      onClick={() => {
                        props.apiHandler.blockUser(params.row.id)
                        .then((res) => { 
                          window.location.reload(false);
                        })
                        .catch((error) => {
                            setDeleteError("Server is not available. Try again later.");
                        })
                      }}>
                Block User
              </Button>
            </strong>);
          } else {
            return (<strong>
          <Button variant="contained" color="success" size="small" style={{marginLeft: 16}}
                  aria-label={'unblockUser' + params.row.id}
                  onClick={() => {
                    props.apiHandler.unblockUser(params.row.id)
                    .then((res) => {
                        window.location.reload(false);
                    })
                    .catch((error) => {
                        setDeleteError("Server is not available. Try again later.");
                    })
                  }}>
                  Unblock User
                  </Button>
            </strong>);
                    
        }
      }
    }
  },
  {
    field: 'sendFunds',
    headerName: 'Send Funds',
    width: 150,
    renderCell: (params) => {
      
       return <strong>
            <BasicModal
        userId={params.row.id}
        apiHandler={props.apiHandler}
      >
        Send Funds
      </BasicModal>
        
      </strong>
    }
  }
];

  function handleSearchBarChange(event) {
    props.apiHandler.getUsersSlice(event.target.value)
    .then((db_users) => {
      setRows(db_users.data)
      console.log(db_users.data)
  })
  .catch((error) => {
    console.log(error)

  })
}

  return (
    <div >
      <ErrorBox errorString={deleteButtonError}/>
      <TextField fullWidth label="Search" id="search" onChange={handleSearchBarChange}  />
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
 