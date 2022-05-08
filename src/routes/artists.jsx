import React from 'react'
import MusicTable from '../components/MusicTable'
import { Container } from '@mui/material'


const columns =[
    { field: 'name', width: 150 },
    
    { field: 'albums', width: 150 },
    { field: 'songs', width: 150 },
    { field: 'genre', width: 150 }
]


const rows = [
    {
        id: 1,
        name: 'All You Need is Love',
        albums: 3,
        songs: 50,
        genre: "Rock"
    },
    
    {
        id: 2,
        name: 'All You Need is Love',
        albums: 3,
        songs: 50,
        genre: "Rock"
    },
    {
        id: 3,
        name: 'All You Need is Love',
        albums: 3,
        songs: 50,
        genre: "Rock"
    },
    {
        id: 4,
        name: 'All You Need is Love',
        albums: 3,
        songs: 50,
        genre: "Rock"
    }
    ]

export default function artists(props) {
  return (
    <Container maxWidth={false}>
      <MusicTable  apiHandler = {props.apiHandler} searchParameter = {"artist"} columns = {columns} rows = {rows} />
    </Container>
  )
}
