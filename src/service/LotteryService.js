// const baseUrl = 'http://localhost:8080';
// const baseUrl = 'https://tops-mudfish-logically.ngrok-free.app';

import {Constants} from "./Constants.js";

const requestOptions = {
    headers: {'ngrok-skip-browser-warning': 'anyValueHere'},
};
export function getLotteries(callback) {

    const requestOptions = {
        headers: {'ngrok-skip-browser-warning': 'anyValueHere', 'Authorization': window.localStorage.getItem('tkn')},
    };

    fetch(`${Constants.BASE_URL}/api/v1/lotteries`, requestOptions)
        .then((res) => res.json())
        .then((data) => {
            callback(data.content);
        }).catch((err) => {
        console.log(err);
    });
}

export function getInvoiceLink(lotteryId, tgUserId, amount, callback) {
    let json = JSON.stringify({
        "lotteryId": lotteryId,
        'tgUserId': tgUserId,
        'amount': amount
    });

    const requestOptions = {
        method: 'POST',
        headers: {'Content-Type': 'application/json', 'Authorization': window.localStorage.getItem('tkn')},
        body: json
    };

    console.log(json)

    fetch(`${Constants.BASE_URL}/api/v1/payments/invoice-link`, requestOptions)
        .then((res) => res.text())
        .then((data) => {
            callback(data);
        }).catch((err) => {
        console.log(err);
    });
}