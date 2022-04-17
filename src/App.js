import React from "react";
import UsersTable from "./components/UsersTable";
import LogIn from "./components/LogIn";

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {loggedIn: false};
        this.requestLogIn = this.requestLogIn.bind(this);
    }

    requestLogIn(userName, password) {
        console.log(userName);
        console.log(password);
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
                    <UsersTable/>
                </div>
            );
        }
    }
}

export default App;
