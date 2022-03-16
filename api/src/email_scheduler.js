const ConvCSV = require('../emails/exportCSV.js')
const cron = require('node-cron')
const sendCSVFile = require('../emails/account.js')

const task = cron.schedule('0 0 19 * * *', ()=>{//Sends email everyday at 7:00 PM - will require sendgrid api key(../emails/account.js) to work
    ConvCSV
    sendCSVFile()
    console.log('CSV file sent!')
},{
    scheduled: false,
})

module.exports = task