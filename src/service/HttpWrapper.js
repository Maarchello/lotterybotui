import {Constants} from "./Constants.js";

export function getAsJson(url, callback) {
    const requestOptions = {
        headers: {'ngrok-skip-browser-warning': 'anyValueHere',
            'Authorization': window.localStorage.getItem(Constants.TKN_PROP_NAME)},
    };

    fetch(url, requestOptions)
        .then((res) => res.json())
        .then((data) => {
            callback(data.content);
        }).catch((err) => {
        console.log(err);
    });
}

export function getAsText(url, callback) {
    const requestOptions = {
        headers: {'ngrok-skip-browser-warning': 'anyValueHere',
            'Authorization': window.localStorage.getItem(Constants.TKN_PROP_NAME)},
    };

    fetch(url, requestOptions)
        .then((res) => res.text())
        .then((text) => text.length ? JSON.parse(text) : {})
        .then((data) => {
            callback(data);
        }).catch((err) => {
        console.log(err);
    });
}

export function post(url, body, callback) {
    const requestOptions = {
        method: 'POST',
        headers: {'Content-Type': 'application/json', 'Authorization': window.localStorage.getItem(Constants.TKN_PROP_NAME)},
        body: body
    };

    fetch(url, requestOptions)
        .then((res) => res.text())
        .then((data) => {
            callback(data);
        }).catch((err) => {
        console.log(err);
    });
}