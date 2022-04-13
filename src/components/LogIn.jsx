import React from 'react'
import TextField from '@mui/material/TextField';

class LogIn extends React.Component {
    constructor(props) {
        super(props);
        this.state = {userName: null, password: null};
        this.handleTextFieldChange = this.handleTextFieldChange.bind(this);
    }

    handleTextFieldChange(e) {
        this.setState({
            textFieldValue: e.target.value
        });
    }

    render() {
        return (
            <div>
                <h1>Spotifiubyfy</h1>
                <h5>Hello there admin! Please, log in.</h5>
                <TextField label="Username" onChange={this.handleTextFieldChange}/>
                <TextField label="Password" onChange={this.handleTextFieldChange}/>
            </div>
        );
    }
}

export default LogIn;
