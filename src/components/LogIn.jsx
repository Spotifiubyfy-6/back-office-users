import React from 'react'
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { useState } from 'react';
import { getToken } from '../functions/getTokenRequest';

export default function LogIn(props) {
    const [username, setUsername] = useState([]);
    const [password, setpassword] = useState([]);
    const [loginError, setLoginError] = useState([])

    function requestLogin(username, password) {
        if(username == null || password == null) {
            setLoginError("Fill both username and password fields");
            return;
        }
        getToken(username, password)
        .then((res) => {
            var auth = res.data.token_type + ' ' + res.data.access_token;
            props.setAuthorization(auth);
            props.setLoginState(true)
        }).catch((error) => {
            let stringError = error.toString();
            console.log(stringError);
            setLoginError(stringError)
        })
    }
        
    return (
        <div> 
            <h5>Hello there admin! Please, log in.</h5>
            <TextField label="Username" onChange={(e) => setUsername(e.target.value)}/>
            <TextField label="Password" type="password" onChange={(e) => setpassword(e.target.value)}/>
            <div>
                <Button variant="contained" onClick={()=>{requestLogin(username, password)}}>Log in</Button>
            </div>
            <div>
                <h3 style={{color: 'red'}}>{loginError}</h3>
            </div>
        </div>
    );
    
}

