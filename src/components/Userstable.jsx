import React from 'react'
import {
  useState,
  useEffect
} from 'react';
import DataGridUsers from './Datagrid';
import LinearIndeterminate from './ProgressLinear';
/**
 * 
 * @returns {DataGridUsers} table component with users in database listed
 */

export default function UsersTable(props) {

  const [users, setUsers] = useState([]);

  // Fetches Users 
  useEffect(() => {
    props.apiHandler.getUsers()
    .then((db_users) => {
      setUsers(db_users.data)
    })
    .catch((error) => {
      console.log(error);
    })
  }, []);

  if (users.length === 0) {
    return < LinearIndeterminate />
  } else {
    return ( 
      <div >
      < DataGridUsers rows = {users} apiHandler = {props.apiHandler} />
      </div>
    )
  }
}
