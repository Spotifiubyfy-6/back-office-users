import React from 'react'
import { DataGrid } from '@mui/x-data-grid';
import { FormControl, FormLabel, RadioGroup, FormControlLabel, Radio, TextField, Box } from '@mui/material';

import { useState } from 'react';



const rowsData = [
    {
        id: 1,
        name: 'All You Need is Love',
        duration: 3,
        artist: 'The Beatles',
        album: "Yellow Submarine",
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
        album: "Sgt. Pepper",
        genre: "Rock"
    },
    {
        id: 4,
        name: 'Coming In From The Cold',
        duration: 6,
        artist: 'Bob Marley',
        album: "Uprising",
        genre: "Reagge"
    }
]





const columns =[
        { field: 'name', width: 150 },
        { field: 'artist', width: 150 },
        { field: 'duration', width: 150 },
        { field: 'album', width: 150 },
        { field: 'genre', width: 150 }
    ]

export default function MusicTable() {

    const [searchOption, setSearchOption] = useState("name");
    const [rows, setRows] = useState(rowsData)


    
    const handleSearchBarChange = (event) => {
        console.log(event.target.value)
        if (event.target.value === '') {
            setRows(rowsData)
        } else {
            setRows(rowsData.filter((song) => song[searchOption].includes(event.target.value)))
        }
    }
    const handleChange = (event) => {
        console.log(event.target.value)
        setSearchOption(event.target.value);
    };
    return (
        <div >
        
            <Box display="flex" sx={{height:"500px"}} >
                <Box  padding="0 20px 0 0">
                    <FormControl >
                        <FormLabel id="demo-radio-buttons-group-label">Search options</FormLabel>
                        <RadioGroup
                            aria-labelledby="demo-radio-buttons-group-label"
                            defaultValue="female"
                            name="radio-buttons-group"
                            value={searchOption}
                            onChange={handleChange}
                        >
                            <FormControlLabel value="name" control={<Radio />} label="Name" />
                            <FormControlLabel value="artist" control={<Radio />} label="Artist" />
                            <FormControlLabel value="album" control={<Radio />} label="Album" />
                            <FormControlLabel value="genre" control={<Radio />} label="Genre" />
                        </RadioGroup>
                    </FormControl>
                </Box>
                <Box display="flex" flexDirection="column" sx={{width:"100%"}}>
                    <TextField fullWidth label="Search" id="search" onChange={handleSearchBarChange} />
                    <DataGrid         
                    rows={rows}
                    columns={columns}
                    disableSelectionOnClick
                    style={{ height: "500px", widht: "100%"}}/>
                </Box>
            </Box>
        </div>
    )
}
