import {Constants} from "./Constants.js";
import {getAsJson, post} from "./HttpWrapper.js";

export function getLotteries(callback) {
    getAsJson(`${Constants.BASE_URL}/api/v1/lotteries`, callback);
}

export function getInvoiceLink(lotteryId, tgUserId, amount, callback) {
    let json = JSON.stringify({
        'paymentType': "LOTTERY",
        'lotteryId': lotteryId,
        'tgUserId': tgUserId,
        'amount': amount
    });

    post(`${Constants.BASE_URL}/api/v1/payments/invoice-link`, json, callback);
}

export function getBoostInvoiceLink(lotteryId, tgUserId, type, callback) {
    let json = JSON.stringify({
        'paymentType': "BOOST",
        'boostType': type,
        'lotteryId': lotteryId,
        'tgUserId': tgUserId
    });

    post(`${Constants.BASE_URL}/api/v1/payments/invoice-link`, json, callback);
}