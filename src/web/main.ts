/*
1. Check if api is reachable. If not display an error page.
2. Display a homepage with a getting started and explaination
3. SAP dashboard, 
    - list all rewards and checkmark tts for them.
    - overlay link and settings, (display text or not and text font settings)
    - tts voice settings

- consistent header for all pages, homepage and dashboard
    - including "Tip" button.
    - Homepage Button, login/logout button
*/

import './components/LinkButtons';
import './components/Switch';
import './components/LoginButton';

// @ts-ignore
import { createApp } from 'vue/dist/vue.esm-bundler';
import Configuration from './views/Configuration';

function init() {
    const app = createApp({
        name: 'app',
        data() {
            return {
                lol: 123
            }
        },
        components: {
            'app-config': Configuration
        },
        template: `
            <div>
                <app-config></app-config>
            </div>
        `
    });
    app.mount("#app");
}

window.addEventListener('DOMContentLoaded', e => init());


// Sopces needed: 
// - channel:read:redemptions
//      for GET https://api.twitch.tv/helix/channel_points/custom_rewards
