import { css, html, LitElement, customElement, property } from 'lit-element';

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
        const logged_in = false;

        if(logged_in) {
            return html`
                <link-button loggedin display_icon="toggle_on" href="./dashboard">Configure</link-button>
            `;
        }
        return html`
            <link-button display_icon="link" href="./dashboard">Login with Twitch</link-button>
        `;
    }
}
