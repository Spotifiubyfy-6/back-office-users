import React from 'react'
import {
  useState,
  useEffect
} from 'react';
import DataGridUsers from './Datagrid';
import LinearIndeterminate from './ProgressLinear';
import ErrorBox from "./ErrorBox";
/**
 * 
 * @returns {DataGridUsers} table component with users in database listed
 */

export default function UsersTable(props) {

  const [users, setUsers] = useState([]);
  const [error, setError] = useState('');
  // Fetches Users 
  useEffect(() => {
    props.apiHandler.getUsers()
    .then((db_users) => {
      setUsers(db_users.data)
    })
    .catch((error) => {
      setError("Server is not available. Try again later.");
    })
  }, []);

  if (users.length === 0) {
    return (
        <div >
          < LinearIndeterminate />
          <ErrorBox errorString={error}/>
        </div>)
  } else {
    return ( 
      <div >
      < DataGridUsers rows = {users} apiHandler = {props.apiHandler} />
        <ErrorBox errorString={error}/>
      </div>
    )
  }
}
