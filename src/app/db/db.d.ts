
type Widget = {
    id: string,
    trigger_id: string,
    account: string,
    voice: string,
}

type Account = {
    id: "",
    user_id: "",
    created_at: Date,
}

export type Data = {
    accounts: Account[],
    widgets: Widget[]
}