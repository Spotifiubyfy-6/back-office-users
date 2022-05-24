import React from 'react'
import MusicTable from '../components/MusicTable'
import { Container } from '@mui/material'

const columns =[
  { field: 'id', width: 150 },
  { field: 'song_name', width: 150 },
  { field: 'song_description', width: 150 },
  { field: 'storage_name', width: 150 },
  { field: 'album_id', width: 150 }
]


export default function songs(props) {

  return (
    <Container maxWidth={false}>
      <MusicTable  apiHandler = {props.apiHandler} searchParameter = {"songs"} columns = {columns} />
    </Container>
  )
}
