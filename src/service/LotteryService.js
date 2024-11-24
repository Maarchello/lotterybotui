import {Constants} from "./Constants.js";
import {getAsJson, post} from "./HttpWrapper.js";

const requestOptions = {
    headers: {'ngrok-skip-browser-warning': 'anyValueHere'},
};
export function getLotteries(callback) {
    getAsJson(`${Constants.BASE_URL}/api/v1/lotteries`, callback);
}

export function getInvoiceLink(lotteryId, tgUserId, amount, callback) {
    let json = JSON.stringify({
        "lotteryId": lotteryId,
        'tgUserId': tgUserId,
        'amount': amount
    });

    post(`${Constants.BASE_URL}/api/v1/payments/invoice-link`, json, callback);
}