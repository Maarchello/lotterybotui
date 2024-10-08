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

export function getInvoiceLink(callback) {
    const requestOptions = {
        method: 'POST'
    };
    fetch(`${baseUrl}/api/v1/stars/invoice-link`, requestOptions)
        .then((res) => res.json())
        .then((data) => {
            callback(data);
        }).catch((err) => {
        console.log(err);
    });
}