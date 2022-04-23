import React from "react";
import UsersTable from "./components/UsersTable";
import LogIn from "./components/LogIn"
import APIHandler from "./classes/APIHandler"
import { useState } from "react";

function App(props) {

    const [loggedIn, setLoggedIn] = useState(false);
    // SEE REACT ROUTER
    if (loggedIn) {
        return <UsersTable apiHandler = {props.apiHandler}/>
    } else {
        return (
            <div>
                <h1>Spotifiubyfy</h1>
                <LogIn apiHandler = {props.apiHandler} setLoginState = {setLoggedIn}/>
            </div>
        ); 
    }  
}

export default App;
