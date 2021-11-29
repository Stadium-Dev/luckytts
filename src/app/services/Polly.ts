import AWS from 'aws-sdk';

const PollyService = new AWS.Polly({
    signatureVersion: 'v4',
    region: 'eu-central-1'
});

type TTSOptions = {
    voice: string,
    text: string,
}

async function createAudioFile(options: TTSOptions) {
    const params = {
        'Text': options.text,
        'OutputFormat': 'mp3',
        'VoiceId': options.voice
    }
    
    return new Promise((resolve, reject) => {
        PollyService.synthesizeSpeech(params, (err, data) => {
            if (err) {
                console.log('[AMZN POLLY ERROR]', err);
            } else if (data) {
                if (data.AudioStream instanceof Buffer) {
                    const base64 = data.AudioStream.toString("base64");
                    resolve('data:audio/mp3;base64,' + base64);
                }
            }
        })
    })
}

export default class AWSPolly {

    static async tts(text: string, voice: string) {
        const params = {
            text: text,
            voice: voice || "Marlene"
        }
    
        return {
            file: await createAudioFile(params)
        };
    } 

}
