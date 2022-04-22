import {getToken} from "../functions/getTokenRequest";
import configData from "./APIHandlerConstants"

class APIHandler {
    constructor() {
        this.token = '';
    }

    logIn(username, password) {
        getToken(username, password)
        .then((res) => {
            this.token = res.data.token_type + ' ' + res.data.access_token;
            return configData.SUCCESS;
        }).catch((error) => {
            let stringError = error.toString();
            console.log(stringError);
            return stringError;
        })
    }
}