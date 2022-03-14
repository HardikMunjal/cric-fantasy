//Operation Collection aka log schema declared here
const mongoose = require('mongoose')

const logSchema = new mongoose.Schema({
    name: {
        type: String,//name of the query that is run
        required: true
    },
    created_by : {
        type : String,//name of the user who ran that query
        default : null
    },
    created_on: {
        type: Date,
        default: Date.now
    }
})

module.exports= Log = mongoose.model('Log', logSchema)