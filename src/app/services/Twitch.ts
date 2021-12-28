import fetch from 'node-fetch';

const TWITCH_CLIENT_ID = process.env["TWITCH_CLIENT_ID"];
const TWITCH_CLIENT_SECRET = process.env["TWITCH_CLIENT_SECRET"];
const TWITCH_REDIRECT_URI = process.env["TWITCH_REDIRECT_URI"];

let access_token = null;

const user_cahce = {};

export default class Twitch {

    static async checkAuth() {
        // TODO: re auth when token expires
        if (access_token === null) {
            await this.authenticate();
        }
        return;
    }

    static async authenticate() {
        const scopes = ``;
        const url = `https://id.twitch.tv/oauth2/token?client_id=${TWITCH_CLIENT_ID}&client_secret=${TWITCH_CLIENT_SECRET}&grant_type=client_credentials&scope=${scopes}`;
        return fetch(url, {
            method: "POST"
        }).then(async res => {
            if (res.status == 200) {
                const json = await res.json();
                access_token = json.access_token;
            } else {
                throw new Error("Twitch auth failed.")
            }
        });
    }

    static async fetchApi(endpoint: string, body: any) {
        const query = "?" + Object.keys(body).map(key => `${key}=${body[key]}`).join("&");
        return fetch("https://api.twitch.tv/helix" + endpoint + query, {
            headers: {
                'Authorization': `Bearer ${access_token}`,
                'Client-Id': `${TWITCH_CLIENT_ID}`
            }
        }).then(res => {
            if (res.status == 200) {
                return res.json();
            } else {
                console.error("Api req failed:", res.status);
            }
        });
    }

    static async getUser(user_login: string) {
        await this.checkAuth();

        if (user_cahce[user_login]) {
            return user_cahce[user_login];
        }

        if (user_login) {
            const users = await this.fetchApi('/users', { login: user_login });
            if (users && users.data) {
                const result = users.data[0];
                user_cahce[user_login] = result;
                return result || null;
            }
        }
        return null;
    }

    static async getRewards(user_id: string) {
        await this.checkAuth();

        if (user_id) {
            const rewards = await this.fetchApi('/channel_points/custom_rewards', { broadcaster_id: user_id });
            if (rewards && rewards.data) {
                return rewards.data || null;
            }
        }
        return null;
    }

    static async subscribe(body: CreateEventSubParams) {
        await this.checkAuth();

        return fetch("https://api.twitch.tv/helix/eventsub/subscriptions", {
            method: "POST",
            headers: {
                'Authorization': `Bearer ${access_token}`,
                'Client-Id': `${TWITCH_CLIENT_ID}`
            },
            body: JSON.stringify(Object.assign(body, {
                transport: {
                    "method": "webhook",
                    "callback": "/* TODO: Server ip url */"
                }
            }))
        }).then(res => {
            if (res.status == 200) {
                return res.json();
            } else {
                console.error("Api req failed:", res.status);
            }
        });
    }

}

type CreateEventSubParams = {
    type: string,
    version: string,
    condition: any,
}

export enum SubscriptionType {
    ChannelPointRedemtion = "channel.channel_points_custom_reward_redemption.add"
}