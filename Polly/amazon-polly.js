//Load the SDK
const AWS = require('aws-sdk')
const Stream = require('stream')
const Speaker =  require('speaker')

//Create an Polly Client

const Polly = new AWS.Polly({
    signatureVersion: 'v4',
    region: 'us-west-2'
})


//Create the Speaker Instance

const Player = new Speaker({
   channels: 1,
   bitDepth: 16,
   sampleRate: 16000
})

let params = {
    'Text': 'Hi, my name is Renjith',
    'OutputFormat': 'pcm',
    'VoiceId': 'Joanna'
}

Polly.synthesizeSpeech(params, (err, data) => {
    if (err) {
        console.log(err.code)
    } else if (data) {
        if (data.AudioStream instanceof Buffer) {
            // Initiate the source
            var bufferStream = new Stream.PassThrough()
            // convert AudioStream into a readable stream
            bufferStream.end(data.AudioStream)
            // Pipe into Player
            bufferStream.pipe(Player)
        }
    }
})
