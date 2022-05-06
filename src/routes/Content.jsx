import React from 'react'
import MusicTable from '../components/MusicTable'
import { Container } from '@mui/material'

export default function users(props) {
  return (
    <Container maxWidth={false}>
      <MusicTable  apiHandler = {props.apiHandler} />
    </Container>
  )
}
