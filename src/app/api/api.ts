import express from 'express';
import AWSPolly from '../services/Polly';
import Twitch, { SubscriptionType } from '../services/Twitch';
import SimpleDatabse from './../db/db';

const router = express.Router();

async function createDatabase() {
    const db = new SimpleDatabse("db");
    await db.init();
    return db;
}

let db = null;

router.use(async function timeLog(req, res, next) {
    console.log('Time: ', Date.now());

    if (!db) {
        db = await createDatabase();
    }

    next();
});

router.get('/', async (req, res) => {
    res.send("This is an api endpoint");
});

router.get('/rewards', async (req, res) => {
    // const data = await Twitch.getUser(req.query.user);
    // const rewards = await Twitch.getRewards(data.id);

    const d = await Twitch.subscribe({
        type: SubscriptionType.ChannelPointRedemtion,
        version: "1",
        condition: {
            reward_id: 10101010
        }
    });

    res.send(d);
});

router.get('/tts', async (req, res) => {
    const response = await AWSPolly.tts(req.query['text'], req.query['voice']);
    res.send(response);
});

export default router;