import React from 'react'
import MusicTable from '../components/MusicTable'
import { Container, Button } from '@mui/material'
const queryString = require('query-string');

const columns =[
    { field: 'id', width: 150 },
    { field: 'album_name', width: 150 },
    { field: 'album_genre', width: 150 },
    { field: 'album_media', width: 150 },
    { field: 'album_description', width: 150 },
    { field: 'artist_id', width: 150 },
    { field: 'suscription', width: 150 },
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
                        parsed.album_name = params.row.id
                        window.location.search = queryString.stringify(parsed)
                        window.location = '/songs/?' +  queryString.stringify(parsed)
                        

                    }}>
            View Songs
            </Button>
          </strong>
        },
      }
]

export default function albums(props) {
  
  
  return (
    <Container maxWidth={false}>
      <MusicTable  apiHandler = {props.apiHandler} searchParameter = {"albums"} columns = {columns} />
    </Container>
  )
}
