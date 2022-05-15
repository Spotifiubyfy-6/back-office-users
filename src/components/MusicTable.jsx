import React, { useEffect } from 'react'
import { DataGrid } from '@mui/x-data-grid';
import {TextField, Box } from '@mui/material';
import { useState } from 'react';
const queryString = require('query-string')








export default function MusicTable(props) {

    const rowsData = props.rows
    

    useEffect(() => {
            const parameters = queryString.parse(window.location.search)
            console.log("Nombre de album", parameters.album_name)

            console.log("Nombre de artista", parameters.artist_name)



    }, [])
    
    

    const [rows, setRows] = useState(rowsData)


    
    const handleSearchBarChange = (event) => {
        console.log(event.target.value)
        if (event.target.value === '') {
            setRows(rowsData)
        } else {
            setRows(rowsData.filter((row) => row[props.searchParameter].includes(event.target.value)))
        }
    }
    return (
        <div >
        
            <Box display="flex" sx={{height:"500px"}} >
                <Box display="flex" flexDirection="column" sx={{width:"100%"}}>
                    <TextField fullWidth label="Search" id="search" onChange={handleSearchBarChange}  />
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
