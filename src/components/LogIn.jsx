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

    handleTextFieldChange(changedField, e) {
        this.setState({
            changedField: e.target.value
        });
        console.log(this.state.changedField);
    }

    handleRequest(e) {
        console.log('Clicked!\n');
    }

    render() {
        return (
            <div>
                <h5>Hello there admin! Please, log in.</h5>
                <TextField label="Username" onChange={(e) => this.handleTextFieldChange("userName", e)}/>
                <TextField label="Password" type="password" onChange={(e) => this.handleTextFieldChange("password", e)}/>
                <div><Button variant="contained" onClick={this.handleRequest}>Contained</Button></div>
            </div>
        );
    }
}

export default LogIn;
