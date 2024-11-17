// const baseUrl = 'http://localhost:8080';
// const baseUrl = 'https://tops-mudfish-logically.ngrok-free.app';

import {Constants} from "./Constants.js";

const requestOptions = {
    headers: {'ngrok-skip-browser-warning': 'anyValueHere'},
};
export function getCurrentProfile(callback) {

    fetch(`${Constants.BASE_URL}/api/v1/profiles/me`, requestOptions)
        .then((res) => res.text())
        .then((text) => text.length ? JSON.parse(text) : {})
        .then((data) => {
            callback(data);
        }).catch((err) => {
        console.log(err);
    });
}