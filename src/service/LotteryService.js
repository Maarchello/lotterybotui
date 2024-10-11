// const baseUrl = 'http://localhost:8080';
const baseUrl = 'https://tops-mudfish-logically.ngrok-free.app';

const requestOptions = {
    headers: {'ngrok-skip-browser-warning': 'anyValueHere'},
};
export function getLotteries(callback) {

    fetch(`${baseUrl}/api/v1/lotteries`, requestOptions)
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
        headers: {'Content-Type': 'application/json'},
        body: json
    };

    console.log(json)

    fetch(`${baseUrl}/api/v1/payments/invoice-link`, requestOptions)
        .then((res) => res.text())
        .then((data) => {
            callback(data);
        }).catch((err) => {
        console.log(err);
    });
}