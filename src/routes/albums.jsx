import React from 'react'
import MusicTable from '../components/MusicTable'
import { Container } from '@mui/material'

const columns =[
    { field: 'name', width: 150 },
    { field: 'artist', width: 150 },
    { field: 'duration', width: 150 },
    { field: 'songs', width: 150 },
    { field: 'genre', width: 150 }
]


const rows = [
    {
        id: 1,
        name: 'All You Need is Love',
        duration: 3,
        artist: 'The Beatles',
        songs: 10,
        genre: "Rock"
    },
    {
        id: 2,
        name: 'All Together Now',
        duration: 4,
        artist: 'The Beatles',
        album: "Yellow Submarine",
        genre: "Rock"
    },
    {
        id: 3,
        name: 'Fixing A Hole',
        duration: 5,
        artist: 'The Beatles',
        songs: 10,
        genre: "Rock"
    },
    {
        id: 4,
        name: 'Coming In From The Cold',
        duration: 6,
        artist: 'Bob Marley',
        songs: 10,
        genre: "Reagge"
    }
    ]
export default function albums(props) {
  return (
    <Container maxWidth={false}>
      <MusicTable  apiHandler = {props.apiHandler} searchParameter = {"album"} columns = {columns} rows = {rows} />
    </Container>
  )
}
