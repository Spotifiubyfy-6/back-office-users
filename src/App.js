import React from "react";
import GetUsers from "./components/Getusers";
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
                    <GetUsers/>
                </div>
            );
        }
    }
}

export default App;
