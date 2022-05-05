import React from "react";
import LogIn from "./components/LogIn"
import { useState } from "react";
import {Outlet } from "react-router-dom";
import Drawer from "./components/Drawer.jsx";
import { Box } from "@mui/material";

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
                <Box display="flex" flexDirection="column" alignItems="center">
                    <h1>Spotifiubyfy</h1>
                    <LogIn apiHandler = {props.apiHandler} setLoginState = {setLoggedIn}/>
                </Box>
            </div>
        ); 
    }  
}

export default App;
