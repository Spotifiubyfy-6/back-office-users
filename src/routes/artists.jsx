import React from 'react'
import MusicTable from '../components/MusicTable'
import { Container, Button } from '@mui/material'
const queryString = require('query-string')

const columns =[
    { field: 'name', width: 150 },
    
    { field: 'albums', width: 150 },
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
                      parsed.artist_name = params.row.name
                      window.location.search = queryString.stringify(parsed)
                      window.location = '/songs/?' +  queryString.stringify(parsed)
                      

                  }}>
          View Songs
          </Button>
        </strong>
      },
    },
    {
      field: 'viewAlbums',
      headerName: 'View Albums',
      width: 150,
      renderCell: (params) => {
         return <strong>
          <Button variant="contained" color="secondary" size="small" style={{marginLeft: 16}}
                  aria-label={'View Albums'}
                  onClick={() => {
                      const parsed = queryString.parse(window.location.search);
                      parsed.artist_name = params.row.name
                      window.location.search = queryString.stringify(parsed)
                      window.location = '/albums/?' +  queryString.stringify(parsed)
                      

                  }}>
          View Albums
          </Button>
        </strong>
      },
    }
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
      <MusicTable  apiHandler = {props.apiHandler} searchParameter = {"name"} columns = {columns} rows = {rows} />
    </Container>
  )
}
