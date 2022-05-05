import React from 'react'
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { useState } from 'react';
import APIHandler from '../classes/APIHandler.js'
import ErrorBox from "./ErrorBox";
import { Box } from "@mui/material";

const serverDownString = "Server is not available. Try again later."

export default function LogIn(props) {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [loginError, setLoginError] = useState('')

    function requestLogin(username, password) {
        if (username === '' || password === '') {
            setLoginError("Fill both username and password fields");
            return;
        }
        props.apiHandler.isAdmin(username)
        .then((res) => {
            if (res.data.toString() !== "true") {
                setLoginError("User is not an admin");
                return;
            }
            props.apiHandler.logIn(username, password)
            .then((res) => {
                props.setLoginState(true);
            }).catch((error) => {
                let errorString = error.toString();
                errorString = (errorString.indexOf("500") > -1) ? serverDownString : "Incorrect password.";
                setLoginError(errorString);
            })
        }).catch((error) => {
            let errorString = error.toString();
            errorString = (errorString.indexOf("500") > -1) ? serverDownString : "Username is not registered.";
            setLoginError(errorString);
        })
    }

    return (
        <div>
            <Box display="flex" flexDirection="column" alignItems="center" >
                <h2>Hello there admin! Please, log in.</h2>
                <div>
                    <TextField label="Username" onChange={(e) => setUsername(e.target.value)}
                            inputProps={{ 'aria-label': 'usernameTextField' }} margin="normal"/>
                </div>
                <div>
                <TextField label="Password" type="password" onChange={(e) => setPassword(e.target.value)}
                        inputProps={{ 'role': 'textbox', 'aria-label': 'passwordTextField' }} margin="normal"/>
                </div>
                <div>
                    <Button variant="contained" onClick={()=>{requestLogin(username, password)}}>Log in</Button>
                </div>
                <ErrorBox errorString={loginError}/>
            </Box>
        </div>
    );

}

