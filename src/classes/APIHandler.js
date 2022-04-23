import {getToken} from "../functions/getTokenRequest";
import returnData from "./APIHandlerConstants"
import { getUsers } from '../functions/getUsersRequest';
import React from "react";

class APIHandler {
    constructor() {
        this.token = '';
    }

    async logIn(username, password) {
        const auxAPI = this;
        return new Promise(function(resolve, reject) {
            getToken(username, password)
            .then((res) => {
                auxAPI.token = res.data.token_type + ' ' + res.data.access_token;
                resolve(returnData.SUCCESS);
            }).catch((error) => {
                console.log(error.toString());
                reject(error);
            });
        })
    }

    async getUsers() {
        const auxAPI = this;
        return new Promise(function(resolve, reject) {
            getUsers(auxAPI.token)
            .then((db_users) => {
                resolve(db_users);
            }).catch((error) => {
                console.log(error.toString());
                reject(error);
            })
        });
    }
}

export default APIHandler;