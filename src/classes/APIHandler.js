import {getToken} from "../functions/getTokenRequest";
import returnData from "./APIHandlerConstants"
import LinearIndeterminate from "../components/ProgressLinear";
import React from "react";

class APIHandler {
    constructor() {
        this.token = '';
    }

    async logIn(username, password) {
        console.log(this.token);
        const auxAPI = this;
        return new Promise(function(resolve, eject) {
            getToken(username, password)
            .then((res) => {
                auxAPI.token = res.data.token_type + ' ' + res.data.access_token;
                resolve(returnData.SUCCESS);
            }).catch((error) => {
                console.log(error.toString());
                eject(error);
            });
        })
    };

//        return < LinearIndeterminate />; //return error just in case
}

export default APIHandler;