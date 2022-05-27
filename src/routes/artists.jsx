import React from 'react'
import MusicTable from '../components/MusicTable'
import { Container, Button } from '@mui/material'
const queryString = require('query-string')

const columns =[
    { field: 'id', width: 150 },
    
    { field: 'email', width: 150 },
    { field: 'is_active', width: 150 },
    { field: 'user_type', width: 150 },
    { field: 'username', width: 150},
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
                      parsed.artist_name = params.row.id
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
                      parsed.artist_name = params.row.id
                      window.location.search = queryString.stringify(parsed)
                      window.location = '/albums/?' +  queryString.stringify(parsed)
                      

                  }}>
          View Albums
          </Button>
        </strong>
      },
    }
]



export default function artists(props) {
  return (
    <Container maxWidth={false}>
      <MusicTable  apiHandler = {props.apiHandler} searchParameter = {"artist"} columns = {columns} />
    </Container>
  )
}
