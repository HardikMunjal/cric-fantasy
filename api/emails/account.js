const sgMail = require('@sendgrid/mail')
const fs = require('fs')

sgMail.setApiKey(process.env.SENDGRID_API_KEY) //Sendgrid key, stored as environment variable is to be used here

//pathToAttachment = `${__dirname}/sample_file1.csv`;
attachment1 = fs.readFileSync(`${__dirname}/users.csv`).toString("base64");
attachment2 = fs.readFileSync(`${__dirname}/roles.csv`).toString("base64");

const sendCSVFile = ()=>{
    sgMail.send({
        to: 'hardik.munjal@magicedtech.com',
        from: 'st24092k@gmail.com',
        subject: 'Data records for today!',
        text: 'PFA the CSV files.',
        attachments: [
            {
              content: attachment1,
              filename: "users.csv",
              type: "application/csv",
              disposition: "attachment"
            },
            {
                content: attachment2,
                filename: "roles.csv",
                type: "application/csv",
                disposition: "attachment"
            }
          ]
    })
}

module.exports = sendCSVFile

//const sendCSVFile = require('../emails/account.js')