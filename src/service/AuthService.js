import {Constants} from "./Constants.js";

const baseUrl = 'https://tops-mudfish-logically.ngrok-free.app';

export function authenticate(tgData, callback) {

    const requestOptions = {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({initData: tgData})
    };

    fetch(`${Constants.BASE_URL}/api/v1/auth/tg`, requestOptions)
        .then(response => response.json())
        .then(data => {

        })
}