import { Low, JSONFile } from 'lowdb';

export default class SimpleDatabse {

    async init() {
        type Data = {
            posts: string[] // Expect posts to be an array of strings
        }
        const adapter = new JSONFile<Data>('db.json');
        const db = new Low<Data>(adapter);

        db.data.posts.push("string");

        await db.read();

        db.data ||= { posts: [] };

        db.data.posts.push('hello world')
        db.data.posts[0]

        const { posts } = db.data
        posts.push('hello world')

        await db.write()
    }

}
