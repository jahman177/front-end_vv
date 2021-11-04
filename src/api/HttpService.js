import axios from 'axios';

export default class HttpService {

    constructor(options){
        this.http = axios.create(options);
    }

    get(path, params, headers = {}){
        return new Promise((resolve, reject) => {
            this.http.get(path, {
                params: params,
                headers: headers
            }).then(response => {
                resolve(response);
            }).catch(e => {
                //console.error(e);
                reject(e);
            });
        });
    }
    post(path, params, headers = {}) {
        return new Promise((resolve, reject) => {
            this.http.post(path, params, {
                headers: headers
            }).then(response => {
                resolve(response);
            }).catch(e => {
                console.error(e);
                reject(e);
            });
        });
    }
    put(path, params, headers = {}) {
        return new Promise((resolve, reject) => {
            this.http.put(path, params, {
                headers: headers
            }).then(response => {
                resolve(response);
            }).catch(e => {
                console.error(e);
                reject(e);
            });
        });
    }
    delete(path, params, headers = {}){
        return new Promise((resolve, reject) => {
            this.http.delete(path, {
                params: params,
                headers: headers
            }).then(response => {
                resolve(response);
            }).catch(e => {
                console.error(e);
                reject(e);
            });
        });
    }
}