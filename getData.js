const fs = require('fs')
const mongoose = require('mongoose');
const mongoURI = "mongodb://ds363058.mlab.com:63058/ants";

mongoose.connect(mongoURI, {
    auth: {
        user: 'dev',
        password: "6F-Kw&t?@nB3uyDlCw3w]b'_(>5G$I"
    },
    useNewUrlParser: true, 
    useUnifiedTopology: true});
    
const getData = async() => {
    var timers = mongoose.model('timers', {
        timestamp: String , 
        serviceTime: String
    });
    const data =  await timers.find()
    fs.writeFileSync('results.csv', "")
    data.forEach((antResponse) => {
        fs.appendFileSync('results.csv', `${antResponse.timestamp};${antResponse.serviceTime}\n`);
    })
}

getData()
