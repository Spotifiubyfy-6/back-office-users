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
                    <LogIn/>
                </div>
            );
        } else {
            return (
                <div>
                    <UsersTable/>
                </div>
            );
        }
    }
}

export default App;
