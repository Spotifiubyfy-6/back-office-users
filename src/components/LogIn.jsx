import React from 'react'
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { useState } from 'react';
import APIHandler from '../classes/APIHandler.js'

export default function LogIn(props) {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [loginError, setLoginError] = useState('')

    function requestLogin(username, password) {
        if (username === '' || password === '') {
            setLoginError("Fill both username and password fields");
            return;
        }
        props.apiHandler.logIn(username, password)
        .then((res) => {
            props.setLoginState(true);
        }).catch((error) => {
            let stringError = error.toString();
            setLoginError(stringError);
        })
    }

    return (
        <div> 
            <h5>Hello there admin! Please, log in.</h5>
            <TextField label="Username" onChange={(e) => setUsername(e.target.value)}
                       inputProps={{ 'aria-label': 'usernameTextField' }}/>
            <TextField label="Password" type="password" onChange={(e) => setPassword(e.target.value)}
                       inputProps={{ 'role': 'textbox', 'aria-label': 'passwordTextField' }}/>
            <div>
                <Button variant="contained" onClick={()=>{requestLogin(username, password)}}>Log in</Button>
            </div>
            <div>
                <h3 style={{color: 'red'}}>{loginError}</h3>
            </div>
        </div>
    );
    
}

