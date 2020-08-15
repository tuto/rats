const {Schema, model} = require('mongoose');

const timerSchema = new Schema({
    timestamp: String , 
    serviceTime: String
})



module.exports = model('Timer', timerSchema)