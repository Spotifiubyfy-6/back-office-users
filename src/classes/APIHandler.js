import {getToken} from "../functions/getTokenRequest";
import returnData from "./APIHandlerConstants"
import React from "react";
import axios from "axios";

//const labels = ['6', '5', '4', '3', '2', '1', '0'];
//const data = labels.map(() => Math.floor(Math.random() * 1000));


class APIHandler {
    constructor() {
        const aux = localStorage.getItem('token');
        this.token = (aux == null) ? '' : aux;
        this.endPointApiUsers = 'https://spotifiubyfy-users.herokuapp.com/users/';
    }

    hasActiveToken() {
        return !(this.token === '');
    }

    async isAdmin(username) {
        let config = {
            method: 'get',
            url: 'https://spotifiubyfy-users.herokuapp.com/is_admin/' + username,
            headers: {
                'accept': 'application/json'
            }
        }
        return axios(config);
    }

    async logIn(username, password) {
        const auxAPI = this;
        return new Promise(function(resolve, reject) {
            getToken(username, password)
            .then((res) => {
                auxAPI.token = res.data.token_type + ' ' + res.data.access_token;
                localStorage.setItem('token', auxAPI.token);
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

    async setAsAdmin(user_id) {
        const endpoint = this.endPointApiUsers + "admin/" + user_id;
        let config = {
            method: 'post',
            url: endpoint,
            headers: {
                'Authorization': this.token
            }
        };
        return axios(config);
    }

    async getUserInfoWithId(user_id) {
           const endpoint = this.endPointApiUsers + 'user_by_id/' + user_id;
           let config = {
               method: 'get',
               url: endpoint,
               headers: {
                   'accept': 'application/json',
                   'Authorization': this.token,
                   'Access-Control-Allow-Origin': 'true'
               }
           }
           return axios(config);
       }

    async getMetricsDataFromDaysAgo(metrics_id, days_ago) {
        const max_days = (days_ago>10)?10:days_ago;
        const data = Array.from({length: max_days}, () => Math.floor(Math.random() * 100));
        return Promise.resolve(data);
    }
}

export default APIHandler;