import React from 'react'
import {
  useState,
  useEffect
} from 'react';
import DataGridUsers from './Datagrid';
import { getToken } from '../functions/getTokenRequest';
import { getUsers } from '../functions/getUsersRequest';



export default function Getusers() {

  const [users, setUsers] = useState([]);

  useEffect(() => {
    getToken()
    .then((res) => {
        var auth = res.data.token_type + ' ' + res.data.access_token;
        getUsers(auth)
        .then((db_users) => {
        setUsers(db_users.data)
      })
    })
    .catch((error) => {
      console.log(error);
    })

  }, [])

  if (users.length === 0) {
    return <h1 > LOADING PLEASE WAIT </h1>
  }

  return ( 
    <div >
    < DataGridUsers rows = {users}/> 
    </div>
  )
}
