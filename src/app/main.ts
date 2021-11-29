import SimpleDatabse from './db/db';

async function run() {
    const db = new SimpleDatabse();
    await db.init();
}

run();