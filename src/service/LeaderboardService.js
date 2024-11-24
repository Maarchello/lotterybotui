import {Constants} from "./Constants.js";
import {getAsText} from "./HttpWrapper.js";

const requestOptions = {
    headers: {'ngrok-skip-browser-warning': 'anyValueHere'},
};
export function getLeaderboard(callback) {
    getAsText(`${Constants.BASE_URL}/api/v1/leaderboard`, callback);
}