
type Widget = {
    id: string,
    trigger_id: string,
    account: string,
    voice: string,
}

type Account = {
    id: string,
    user_id: string,
    created_at: Date,
}

export type Data = {
    accounts: Account[],
    widgets: Widget[]
}