import React from "react";
import UsersTable from "./components/UsersTable";
import LogIn from "./components/LogIn"
import { useState } from "react";
import { Link } from "react-router-dom";

function App(props) {

    const [loggedIn, setLoggedIn] = useState(false);
    
    return (
        <div>
            <Link to="/app">Users</Link>
            <Link to="/expenses">Expenses</Link>
        </div>
        );

    /*
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
    }*/  
}

export default App;
