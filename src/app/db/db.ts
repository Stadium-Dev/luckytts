import path from 'path';
import { Low, JSONFile } from 'lowdb';
import { Data, Account, Widget } from './db.d';

export default class SimpleDatabse {

    async init() {
        const db_path = path.resolve('./data/db.json');
        console.log("Database path:", db_path);

        const adapter = new JSONFile<Data>(db_path);
        const db = new Low<Data>(adapter);

        await db.read();

        db.data ||= { accounts: [], widgets: [] };

        db.data.accounts.push(this.createAccount());
        db.data.accounts[0];

        await db.write();
    }

    createAccount(): Account {
        return {
            id: "",
            user_id: "",
            created_at: new Date(),
        }
    }

    createWidget(): Widget {
        return {
            id: "",
            trigger_id: "",
            account: "",
            voice: "",
        }
    }

}
