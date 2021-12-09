import { LitElement, html, css } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { loginWithTwitch, verifyLogin } from '../utils/login';

@customElement("login-button")
export default class LoginButton extends LitElement {

    static get styles() {
        return css`
            :host {

            }
            link-button {
                --background: var(--accent-color2);
            }
            link-button[loggedin] {
                --background: var(--global-font-color);
            }
        `;
    }

    render() {
        const logged_in = verifyLogin();

        if(logged_in) {
            return html`
                <link-button loggedin display_icon="toggle_on" href="./dashboard">Configure</link-button>
            `;
        }
        return html`
            <link-button @click="${() => loginWithTwitch()}" display_icon="link">Login with Twitch</link-button>
        `;
    }
}
