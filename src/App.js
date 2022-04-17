import React from "react";
import UsersTable from "./components/UsersTable";
import LogIn from "./components/LogIn"
import DataGridUsers from './components/Datagrid';
import {getToken} from "./functions/getTokenRequest";
import {getUsers} from "./functions/getUsersRequest";

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {loggedIn: false, users: null};
        this.requestLogIn = this.requestLogIn.bind(this);
    }

    requestLogIn(userName, password) {
        getToken(userName, password)
        .then((res) => {
            var auth = res.data.token_type + ' ' + res.data.access_token;
            getUsers(auth)
            .then((db_users) => {
                this.setState({
                    users: db_users.data,
                    loggedIn: true
                })
            })
        }).catch((error) => {
            console.log(error);
            this.setState({
                users: null,
                loggedIn: false
            })
        })
    }

    render() {
       if (!this.state.loggedIn) {
            return (
                <div>
                    <h1>Spotifiubyfy</h1>
                    <LogIn requestLogIn={this.requestLogIn}/>
                </div>
            );
        } else {
            return (
                <div>
                    <h1>Spotifiubyfy</h1>
                    <DataGridUsers rows = {this.state.users}/>
                </div>
            );
        }
    }
}

export default App;
