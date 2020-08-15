const axios = require('axios');
const timerModel = require('./timer')

const mongoose = require('mongoose');
const mongoURI = process.env.MONGO_URI ;
mongoose.connect(mongoURI, {
    auth: {
        user: process.env.MONGO_USER ,
        password: process.env.MONGO_PASS
    },
    useNewUrlParser: true, 
    useUnifiedTopology: true});

const callAndSave = async(options) => {
    let start = process.hrtime()
    await axios(options);
    let end = process.hrtime(start)
    const serviceTime =  Math.round((end[0] * 1000) + (end[1] / 1000000))
    const date = new Date().toISOString()
    saveData({timestamp: date, serviceTime})

}

const saveData = async(data) => {

    serviceTimer = new timerModel(data)
    serviceTimer.save();
}

const generateRats = (number, options) => {
    const p = []
    for(let i = 0; i < number; ++i) {
        p.push(callAndSave(options))
    }
    return p
}

const ratQueen = (req, res) => {
    const n = req.query.ratsNumber;
    let loop = req.query.loop;
    let interval = req.query.interval
    let options = req.query.options;
    if(!loop) {
        loop = 1;
    }
    loop = parseInt(loop)
    if(options) {
       options = Buffer.from(options, 'base64').toString('ascii');
       options = JSON.parse(options)
    }
    let count = 0;
    let intervalVar = setInterval(async() => {
        ++count;
        try {
            if(count === loop) {
                await Promise.all(generateRats(n,options));
                clearInterval(intervalVar);
                res.status(200).json({'status': 'ok'})
            }else {
                Promise.all(generateRats(n, options));
            }
        }
        catch(error) {
            console.log("error", error)
            clearInterval(intervalVar);
            res.status(200).json({'error': error})
        }
        
    }, interval);
}

exports.ratQueen = ratQueen