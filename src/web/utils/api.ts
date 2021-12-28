
const API_ENDPOINT = "https://dev.luckydye.de/api";

export default class Api {
    static async loginWithCode(code: string) {
        return fetch(API_ENDPOINT, {

        }).then(res => {
            console.log(res);
            return res.json();
        }).then(() => {
            return true;
        }).catch(err => {
            return false;
        })
    }
}