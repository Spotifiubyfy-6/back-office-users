import React from "react";
import UsersTable from "./components/UsersTable";
import LogIn from "./components/LogIn";

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {loggedIn: false};
    }

    render() {
        if (!this.state.loggedIn) {
            return (
                <div>
                    <h1>Spotifiubyfy</h1>
                    <LogIn/>
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
