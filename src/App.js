import React from "react";
import UsersTable from "./components/UsersTable";
import LogIn from "./components/LogIn"
import { useState } from "react";

function App() {

    const [loggedIn, setLoggedIn] = useState(false)
    const [authorization, setAuthorization] = useState([])

    // SEE REACT ROUTER
    if (loggedIn) {
        return <UsersTable authorization = {authorization}/>
    } else {
        return (
            <div>
                <h1>Spotifiubyfy</h1>
                <LogIn setLoginState = {setLoggedIn} setAuthorization = {setAuthorization} />
            </div>
        ); 
    }  
}

export default App;
