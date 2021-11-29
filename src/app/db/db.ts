import uuid4 from "uuid4";
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

        db.data.accounts.push(this.createAccount("testaccount"));
        db.data.accounts[0];

        await db.write();
    }

    createAccount(user_id: string): Account {
        return {
            id: uuid4(),
            user_id: user_id,
            created_at: new Date(),
        }
    }

    createWidget(account_id: string): Widget {
        return {
            id: uuid4(),
            trigger_id: "",
            account: account_id,
            voice: "Brian",
        }
    }

}
