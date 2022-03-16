const mongoose = require('mongoose')

const activitiesSchema = new mongoose.Schema({
    task: {
        type: String,
        required: true
    },
    user : {
        type : String,//name of the user who performed the task
        default : null
    },
    createdate: {
        type: Date,
        default: Date.now
    }
})


module.exports= Task = mongoose.model('Task', activitiesSchema)
