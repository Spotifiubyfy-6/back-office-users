import React from 'react'
import TextField from '@mui/material/TextField';

class LogIn extends React.Component {
    constructor(props) {
        super(props);
        this.state = {userName: null, password: null};
    }

    render() {
        return (
            <div>
                <h1>Spotifiubyfy</h1>
                <h5>Hello there admin! Please, log in.</h5>
                <TextField label="Username"/>
                <TextField label="Password"/>
            </div>
    );
    }
}

export default LogIn;
