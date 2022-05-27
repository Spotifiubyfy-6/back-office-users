import {getToken} from "../functions/getTokenRequest";
import returnData from "./APIHandlerConstants"
import React from "react";
import axios from "axios";

class APIHandler {
    constructor() {
        const aux = localStorage.getItem('token');
        this.token = (aux == null) ? '' : aux;
        this.endPointApiUsers = 'https://spotifiubyfy-users.herokuapp.com/users/';
        this.endPointApiMusic = 'https://spotifiubyfy-music.herokuapp.com/'
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


    async getSongs(name) {
        let config = {
            method: 'get',
            url: this.endPointApiMusic + 'music?q=' + name + '&skip=0&limit=100',
            headers: {
                'accept': 'application/json',
                'Authorization': this.token,
                'Access-Control-Allow-Origin': 'true'
            }
        }
        return axios(config);
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

    async getSongsFromArtist(id) {
        let config = {
            method: 'get',
            url: this.endPointApiMusic + 'artists/' + id + '/songs?skip=0&limit=100',
            headers: {
                'accept': 'application/json',
                'Authorization': this.token,
                'Access-Control-Allow-Origin': 'true'
            }
        }
        return axios(config);
    }

    async getSongsFromAlbum(id) {
        let config = {
            method: 'get',
            url: this.endPointApiMusic + 'albums/' + id + '/tracks',
            headers: {
                'accept': 'application/json',
                'Authorization': this.token,
                'Access-Control-Allow-Origin': 'true'
            }
        }
        return axios(config);
    }

    getAlbums(name) {
        let config = {
            method: 'get',
            url: this.endPointApiMusic + 'albums?q=' + name + '&skip=0&limit=100',
            headers: {
                'accept': 'application/json',
                'Authorization': this.token,
                'Access-Control-Allow-Origin': 'true'
            }
        }
        return axios(config);
    }


    async getAlbumsFromArtist(id) {
        let config = {
            method: 'get',
            url: this.endPointApiMusic + 'artists/' + id + '/albums?skip=0&limit=100',
            headers: {
                'accept': 'application/json',
                'Authorization': this.token,
                'Access-Control-Allow-Origin': 'true'
            }
        }
        return axios(config);
    }


    async getArtist(name) {
        let config = {
            method: 'get',
            url: this.endPointApiUsers + 'artists/' + name + '?skip=0&limit=10',
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
        const metric_type = metrics_id + 100;
        //'https://spotifiubyfy-metrics.herokuapp.com/events/by_day/102?n=10&skip=0&limit=100'
        const endpoint = 'https://spotifiubyfy-metrics.herokuapp.com/events/event/by_day/' + metric_type +
            '?n=' + days_ago + '&skip=0&limit=100';
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
}

export default APIHandler;