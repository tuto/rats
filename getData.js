const fs = require('fs')
const mongoose = require('mongoose');
const mongoURI = YOURMONGOURI;

mongoose.connect(mongoURI, {
    auth: {
        user: YOURMONGOUSER,
        password: YOURMONGOPASS
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
