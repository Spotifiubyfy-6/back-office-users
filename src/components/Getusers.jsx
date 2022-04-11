import React from 'react'
import {
  useState,
  useEffect
} from 'react';
import axios from "axios";
import DataGridUsers from './Datagrid';
import qs from 'qs';



export default function Getusers() {

  const [users, setUsers] = useState([])

  useEffect(() => {

    const getToken = async () => {
      const endPointApiToken = 'https://spotifiubyfy-users.herokuapp.com/token'
      var data = qs.stringify({
        'password': 'romanpass',
        'username': 'roman'
      });
      var config = {
        method: 'post',
        url: endPointApiToken,
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        },
        data: data
      };

      axios(config)
        .then(function (res) {
          var auth = res.data.token_type + ' ' + res.data.access_token
          getUsers(auth)

        })
        .catch(function (error) {
          console.log(error);

        });
    };

    const getUsers = async (auth) => {
      const endPointApiUsers = 'https://spotifiubyfy-users.herokuapp.com/users?skip=0&limit=100'
      var config = {
        method: 'get',
        url: endPointApiUsers,
        headers: {
          'accept': 'application/json',
          'Authorization': auth,
          'Access-Control-Allow-Origin': 'true'
        }
      };

      axios(config)
        .then(function (res) {
          setUsers(res.data)
        })
        .catch(function (error) {
          console.log(error);
        });
    };
    getToken()
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