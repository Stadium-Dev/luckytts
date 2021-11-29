import SimpleDatabse from './db/db';
import AWSPolly from './services/Polly';

async function run() {
    const db = new SimpleDatabse();
    await db.init();

    const x = new AWSPolly();
}

run();
