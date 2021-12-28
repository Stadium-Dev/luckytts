import path from 'path';
import { Low, JSONFile } from 'lowdb';
import { Data, Account, Widget } from './db.d';

export default class SimpleDatabse {

    name: string;
    db: Low<Data>;

    constructor(name: string = "db") {
        this.name = name;
    }

    async init() {
        const db_path = path.resolve(`./data/${this.name}.json`);
        console.log("Database path:", db_path);

        const adapter = new JSONFile<Data>(db_path);
        const db = new Low<Data>(adapter);
        this.db = db;

        await db.read();

        db.data ||= { accounts: [], widgets: [] };

        await db.write();
    }

    createAccount(): Account {
        const account = {
            id: "",
            user_id: "",
            created_at: new Date(),
        };
        this.db.data.accounts.push(account);
        return account;
    }

    createWidget(): Widget {
        const widget = {
            id: "",
            trigger_id: "",
            account: "",
            voice: "",
        };
        this.db.data.widgets.push(widget);
        return widget;
    }

}