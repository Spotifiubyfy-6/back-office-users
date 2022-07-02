import React, { useEffect } from 'react'
import { DataGrid } from '@mui/x-data-grid';
import {TextField, Box } from '@mui/material';
import { useState } from 'react';
const queryString = require('query-string')








export default function MusicTable(props) {

    const rowsData = props.rows
    const [rows, setRows] = useState(rowsData)
    

    useEffect(() => {

            if (props.type == "blocked") {
                props.apiHandler.getBlockedSongs()
                .then((res) => {
                    setRows(res.data)
                }
                )
                .catch((error) => {
                    console.log(error)
                }
                )
            } else {
                

            const parameters = queryString.parse(window.location.search)
            
            if (parameters.album_name) {
                if (props.searchParameter === 'songs') {
                    props.apiHandler.getSongsFromAlbum(parameters.album_name)
                    .then((db_songs) => {
                        setRows(db_songs.data)
                        console.log(db_songs.data)
                    })
                    .catch((error) => {
                        console.log("Server is not available. Try again later.");
                      })
                }
            } else if (parameters.artist_name) {
                if (props.searchParameter === 'songs') {
                    props.apiHandler.getSongsFromArtist(parameters.artist_name)
                    .then((db_songs) => {
                        setRows(db_songs.data)
                        console.log(db_songs.data)
                    })
                    .catch((error) => {
                        console.log("Server is not available. Try again later.");
                      })
                } else if (props.searchParameter === 'albums') {
                    props.apiHandler.getAlbumsFromArtist(parameters.artist_name)
                    .then((db_albums) => {
                        setRows(db_albums.data)
                        console.log(db_albums.data)
                    })
                    .catch((error) => {
                        console.log("Server is not available. Try again later.");
                      })
                }
                
            }

        }



    }, [])
    
    
    const handleSearchBarChange = (event) => {
        if (props.type != "blocked") {
            if (props.searchParameter === 'artist') {
                props.apiHandler.getArtist(event.target.value)
                .then((db_artist) => {
                    setRows(db_artist.data)
                    console.log(db_artist.data)
                })
                .catch((error) => {
                    console.log("Server is not available. Try again later.");
                })
            } else if (props.searchParameter === 'albums') {
                props.apiHandler.getAlbums(event.target.value)
                .then((db_albums) => {
                    setRows(db_albums.data)
                    console.log(db_albums.data)
                })
                .catch((error) => {
                    console.log("Server is not available. Try again later.");
                })
            } else if (props.searchParameter === 'songs') {
                props.apiHandler.getSongs(event.target.value)
                .then((db_songs) => {
                    setRows(db_songs.data)
                    console.log(db_songs.data)
                })
                .catch((error) => {
                    console.log("Server is not available. Try again later.");
                })
            }
        }
        
    }
    return (
        <div >
        
            <Box display="flex" sx={{height:"500px"}} >
                <Box display="flex" flexDirection="column" sx={{width:"100%"}}>
                    {props.type == "blocked" ?  null : <TextField fullWidth label="Search" id="search" onChange={handleSearchBarChange} />}
                    <DataGrid         
                    rows={rows}
                    columns={props.columns}
                    disableSelectionOnClick
                    style={{ height: "500px", widht: "100%"}}/>
                </Box>
            </Box>
        </div>
    )
}
