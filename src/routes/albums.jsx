import React from 'react'
import MusicTable from '../components/MusicTable'
import { Container, Button } from '@mui/material'
const queryString = require('query-string');

const columns =[
    { field: 'name', width: 150 },
    { field: 'artist', width: 150 },
    { field: 'duration', width: 150 },
    { field: 'songs', width: 150 },
    { field: 'genre', width: 150 },
    {
        field: 'viewSongs',
        headerName: 'View Songs',
        width: 150,
        renderCell: (params) => {
           return <strong>
            <Button variant="contained" color="secondary" size="small" style={{marginLeft: 16}}
                    aria-label={'View Songs'}
                    onClick={() => {
                        const parsed = queryString.parse(window.location.search);
                        parsed.album_name = params.row.name
                        window.location.search = queryString.stringify(parsed)
                        window.location = '/songs/?' +  queryString.stringify(parsed)
                        

                    }}>
            View Songs
            </Button>
          </strong>
        },
      }
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
      <MusicTable  apiHandler = {props.apiHandler} searchParameter = {"name"} columns = {columns} rows = {rows} />
    </Container>
  )
}
