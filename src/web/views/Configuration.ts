export default {
    name: 'app-config',
    template: `
        <div>
            <div class="card">
                Browser Source URL:
                <br>
                <br>

                Display Reward Icon:
                <input-switch></input-switch>

                <br>
                <br>
                Animate Text:
                <input-switch></input-switch>

            </div>

            <div class="card-title">
                Add a reward to read out loud:
            </div>
            <div class="card-list">
                <div class="card config">
                Dashboard

                <div class="delete-btn">
                    <span class="material-icons">delete</span>
                </div>
                </div>
                <div class="card transparent button">
                +
                </div>
            </div>
        </div>
    `
}