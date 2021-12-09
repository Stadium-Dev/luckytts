import Api from "./api";
import env from "./env";

const clientId = env.TWITCH_CLIENT_ID;
const redirectURI = location.href;

function parseSearch(str: string) {
    const res: { [key: string]: string } = {};
    str.substring(1).split('&').map(item => item.split('=')).forEach(item => {
        res[item[0]] = unescape(item[1]);
    });
    return res;
}

function authUrl() {

    // Sopces needed: 
    // - channel:read:redemptions
    //      for GET https://api.twitch.tv/helix/channel_points/custom_rewards
    
    const scope = [
        "channel:read:redemptions",
    ].join(" ");

    sessionStorage.twitchOAuthState = nonce(30);
    return 'https://api.twitch.tv/kraken/oauth2/authorize' +
        '?response_type=code' +
        '&client_id=' + clientId +
        '&redirect_uri=' + redirectURI +
        '&state=' + sessionStorage.twitchOAuthState +
        '&scope=' + scope;
}

// Source: https://www.thepolyglotdeveloper.com/2015/03/create-a-random-nonce-string-using-javascript/
function nonce(length: number) {
    var text = "";
    var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    for (var i = 0; i < length; i++) {
        text += possible.charAt(Math.floor(Math.random() * possible.length));
    }
    return text;
}

export function loginWithTwitch() {
    window.open(authUrl());
}

export function verifyLogin() {
    if(location.search) {
        // redirected to here. just completed sign in flow
        const params = parseSearch(location.search);
        if(params.code) {
            const code = params.code;
            localStorage.setItem("twitch-code", code);
            window.close();
        }
    } else {
        // just logged in on some tab
        window.addEventListener("storage", _ => {
            const code = localStorage.getItem("twitch-code");
            if(code != undefined) {
                Api.loginWithCode(code).then(res => {
                    if(res == true) {

                    } else {
                        alert("Server Error: Could not login");
                    }
                }).finally(() => {
                    localStorage.removeItem("twitch-code");
                })
            }
        });
    }

    return false;
}
