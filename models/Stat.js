const {Schema, model} = require('mongoose')
const schema = new Schema({
    count: {type: Number, required: true},
    date: {type: String, required: true},
    userName: {type: String, required: true}

})

module.exports = model('Stat', schema)