import React from 'react'
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';

class LogIn extends React.Component {
    constructor(props) {
        super(props);
        this.state = {userName: null, password: null};
        this.handleTextFieldChange = this.handleTextFieldChange.bind(this);
        this.handlePressedButton = this.handlePressedButton.bind(this);
    }

    handleTextFieldChange(changedField, e) {
        this.setState({
            [changedField]: e.target.value
        });
    }

    handlePressedButton(e) {
        this.props.requestLogIn(this.state.userName, this.state.password);
    }

    render() {
        return (
            <div>
                <h5>Hello there admin! Please, log in.</h5>
                <TextField label="Username" onChange={(e) => this.handleTextFieldChange("userName", e)}/>
                <TextField label="Password" type="password" onChange={(e) => this.handleTextFieldChange("password", e)}/>
                <div><Button variant="contained" onClick={this.handlePressedButton}>Log in</Button></div>
                <div><h3 style={{color: 'red'}}>{this.props.error}</h3></div>
            </div>
        );
    }
}

export default LogIn;
