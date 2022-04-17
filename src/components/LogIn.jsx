import React from 'react'
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';

class LogIn extends React.Component {
    constructor(props) {
        super(props);
        this.state = {userName: null, password: null};
        this.handleTextFieldChange = this.handleTextFieldChange.bind(this);
        this.handleRequest = this.handleRequest.bind(this);
    }

    handleTextFieldChange(e) {
        this.setState({
            textFieldValue: e.target.value
        });
    }

    handleRequest(e) {
        console.log('Clicked!\n');
    }

    render() {
        return (
            <div>
                <h1>Spotifiubyfy</h1>
                <h5>Hello there admin! Please, log in.</h5>
                <TextField label="Username" onChange={this.handleTextFieldChange}/>
                <TextField label="Password" type="password" onChange={this.handleTextFieldChange}/>
                <div><Button variant="contained" onClick={this.handleRequest}>Contained</Button></div>
            </div>
        );
    }
}

export default LogIn;
