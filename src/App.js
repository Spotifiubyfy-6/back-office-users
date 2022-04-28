import React from "react";
import LogIn from "./components/LogIn"
import { useState } from "react";
import {Outlet } from "react-router-dom";
import Drawer from "./components/Drawer.jsx";

function App(props) {


    const [loggedIn, setLoggedIn] = useState(props.apiHandler.hasActiveToken());
    // SEE REACT ROUTER
    if (loggedIn) {
        return (
           <div style={{display: "flex"}}>
                <Drawer/> 
                <Outlet/>
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
