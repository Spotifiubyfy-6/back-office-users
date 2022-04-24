import {getToken} from "../functions/getTokenRequest";
import returnData from "./APIHandlerConstants"
import React from "react";
import axios from "axios";

class APIHandler {
    constructor() {
        this.token = '';
        this.endPointApiUsers = 'https://spotifiubyfy-users.herokuapp.com/users/';
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
        let config = {
            method: 'get',
            url: this.endPointApiUsers,
            headers: {
                'accept': 'application/json',
                'Authorization': this.token,
                'Access-Control-Allow-Origin': 'true'
            }
        }
        return axios(config);
    }

    async deleteUser(user_id) {
        const endpoint = this.endPointApiUsers + user_id;
        let config = {
            method: 'delete',
            url: endpoint,
            headers: {
                'Authorization': this.token
            }
        };
        return axios(config);
    }
}

export default APIHandler;