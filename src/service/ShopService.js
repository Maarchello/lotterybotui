import {Constants} from "./Constants.js";
import {getAsJson, post} from "./HttpWrapper.js";

export function getItems(callback) {
    getAsJson(`${Constants.BASE_URL}/api/v1/shop/items`, callback);
}
export function getInvoiceLink(itemId, tgUserId, callback) {
    let json = JSON.stringify({
        'paymentType': "SHOP",
        'itemId': itemId,
        'tgUserId': tgUserId
    });

    post(`${Constants.BASE_URL}/api/v1/payments/invoice-link`, json, callback);
}

export function getSubscriptionPlanInvoiceLink(subscriptionPlan, tgUserId, callback) {
    let json = JSON.stringify({
        'paymentType': "SUBSCRIPTION",
        'subscriptionPlan': subscriptionPlan,
        'tgUserId': tgUserId
    });

    post(`${Constants.BASE_URL}/api/v1/payments/invoice-link`, json, callback);
}