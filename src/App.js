import React from 'react'
import GetUsers from "./components/Getusers";

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {loggedIn: false};
    }

    render() {
        if (!this.state.loggedIn) {
            return (
                <div>
                    Hello World!
                </div>
            )
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
