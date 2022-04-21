import React from 'react'
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { useState } from 'react';

export default function LogIn() {
    const [username, setUsername] = useState([])
    const [password, setpassword] = useState([])

            
        return (
            <div> 
                <h5>Hello there admin! Please, log in.</h5>
                <TextField label="Username" onChange={(e) => setUsername(e.target.value)}/>
                <TextField label="Password" type="password" onChange={(e) => setpassword(e.target.value)}/>
                <div>
                    <Button variant="contained" onClick={()=>{console.log("REQUESTED LOGIN", password, username)}}>Log in</Button>
                </div>
                <div>
                    <h3 style={{color: 'red'}}>{"ERROR"}</h3>
                </div>
            </div>
        );
    
}

