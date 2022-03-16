const logModel = require('../models/logModel')
const EventEmitter = require('events').EventEmitter
const customEmitter = new EventEmitter()



 Log ={

    fetchLogEntries: (req,res)=>{
        logModel.fetchLog(req.query,function(err,result){
            if(err){
                return res.status(500).send(err)
            }
            if(!result){
                return res.status(400).send('something went wrong!')
            }
            res.status(200).send(result)
        })
    }

}


customEmitter.on('addLog', function(name){
    console.log(name)
    logModel.newLogEntry(name, function(error, result){
        if (error) {
            console.log(error)
        }
        if (!result) {
            console.log('something went wrong')
        } 
    })
})
module.exports={
    Log,
    customEmitter
}
