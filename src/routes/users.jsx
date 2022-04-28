import React from 'react'
import Userstable from '../components/Userstable'

export default function users(props) {
  return (
    <div style={{width: "100%"}}>
      <Userstable  apiHandler = {props.apiHandler} />
    </div>
  )
}
