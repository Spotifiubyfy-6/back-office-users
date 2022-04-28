import React from "react";
import UsersTable from "./components/UsersTable";
import LogIn from "./components/LogIn"
import { useState } from "react";
import { Link, Outlet } from "react-router-dom";

function App(props) {

    const [loggedIn, setLoggedIn] = useState(false);
    

    if (loggedIn) {
        return (
            <div>
                <Link to="/usersTable">users link </Link>
                <Link to="/metrics">metrics link </Link>
                <Outlet />
            </div>
        
        );
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
