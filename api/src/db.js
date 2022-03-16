//database code has to be inserted here
const mongoose = require('mongoose')
const dotenv = require('dotenv')//this will be required if we share the same atlas server for db later on
const cron_job = require('./email_scheduler')
dotenv.config()//this will be used later to store and use the password to the database


//connect the database first before starting the server
//const port = 3000

mongoose.connect('mongodb://127.0.0.1/cric-fantasy')
console.log('Database service connected !')
const app = require('./server')
app.listen(3000, ()=>{
    console.log('server is up, at port 3000')//using local db
    cron_job.start()//Starts email scheduler
})

//console.log(`server is listening at port... ${port}`)

