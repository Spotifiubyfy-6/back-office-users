import React from 'react'
import MusicTable from '../components/MusicTable'
import { Container } from '@mui/material'
import Button from '@mui/material/Button'



export default function songs(props) {

    const columnsSongs =[
      { field: 'id', width: 150 },
      { field: 'song_name', width: 150 },
      { field: 'song_description', width: 150 },
      { field: 'storage_name', width: 150 },
      { field: 'album_id', width: 150 },
      {
        field: 'blockSong',
        headerName: 'BlockSong',
        width: 150,
        renderCell: (params) => {
          return <strong>
            <Button variant="contained" color="error" size="small" style={{marginLeft: 16}}
                    onClick={() => {
                      props.apiHandler.blockSong(params.row.id)
                      .then((res) => { 
                        window.location.reload(false);
                      })
                      .catch((error) => {
                          console.log(error)
                      })
                    }}>
              Block Song
            </Button>
          </strong>
        },
      } 
    ]

  const columnsBlockedSongs =[
    { field: 'id', width: 150 },
    { field: 'song_name', width: 150 },
    { field: 'song_description', width: 150 },
    { field: 'storage_name', width: 150 },
    { field: 'album_id', width: 150 },
    {
      field: 'blockSong',
      headerName: 'unBlockSong',
      width: 150,
      renderCell: (params) => {
        return <strong>
          <Button variant="contained" color="info" size="small" style={{marginLeft: 16}}
                  onClick={() => {
                    props.apiHandler.unBlockSong(params.row.id)
                    .then((res) => { 
                      window.location.reload(false);
                    })
                    .catch((error) => {
                        console.log(error)
                    })
                  }}>
            UnBlock Song
          </Button>
        </strong>
      },
    } 
  ]



  return (
    <Container maxWidth={false}>
      <MusicTable  apiHandler = {props.apiHandler} searchParameter = {"songs"} columns = {columnsSongs} />
      <MusicTable  apiHandler = {props.apiHandler} searchParameter = {"songs"} type = {"blocked"} columns = {columnsBlockedSongs} />
    </Container>
  )
}
