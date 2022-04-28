import React from 'react'
import UsersTable from '../components/UsersTable'

export default function users(props) {
  return (
    <div><UsersTable  apiHandler = {props.apiHandler} /></div>
  )
}
