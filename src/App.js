import React from "react";
import UsersTable from "./components/UsersTable";
import LogIn from "./components/LogIn"
import DataGridUsers from './components/Datagrid';
import {getToken} from "./functions/getTokenRequest";
import {getUsers} from "./functions/getUsersRequest";
import { useState } from "react";

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {loggedIn: false, users: null, logInError: null};
        this.requestLogIn = this.requestLogIn.bind(this);
        this.authorization = null;
    };

    
    
    

    requestLogIn(userName, password) {
        if(userName == null || password == null) {
            this.setState({logInError: "Fill both username and password fields"});
            return;
        }
        getToken(userName, password)
        .then((res) => {
            var auth = res.data.token_type + ' ' + res.data.access_token;
            this.authorization = auth;
            getUsers(auth)
            .then((db_users) => {
                this.setState({
                    users: db_users.data,
                    loggedIn: true,
                    logInError: null
                })
            })
        }).catch((error) => {
            let stringError = error.toString();
            console.log(stringError);
            this.setState({
                users: null,
                loggedIn: false,
                logInError: stringError
            })
        })
    }

    render() {
       if (!this.state.loggedIn) {
            return (
                <div>
                    <h1>Spotifiubyfy</h1>
                    <LogIn requestLogIn={this.requestLogIn} error={this.state.logInError}/>
                </div>
            ); 
        } else {
            return (
                <div>
                    <h1>Spotifiubyfy</h1>
                    <DataGridUsers rows = {this.state.users} authorization={this.authorization} />
                </div>
            );
        }
    }
}

export default App;
