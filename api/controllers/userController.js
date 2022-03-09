const userModel = require('../models/userModel')
const passValidator = require('../../helpers/utility')

module.exports = user = {

    checkExistingUserName: function (req, res, next) {
        userModel.checkExistingUserName(req.body, function (error, result) {
            // console.log(error)
            // console.log(result)
            if (error) {
                return res.status(500).send(error)
            }
            else if (result.length > 0) {
                return res.status(400).send('Username already exists')
            }
            next()
        })
    },
    checkExistingUserEmail: function (req, res, next) {
        userModel.checkExistingUserEmail(req.body, function (error, result) {
            // console.log('in another block')
            // console.log(error)
            // console.log(result)
            if (error) {
                return res.status(500).send(error)
            }
            else if (result.length > 0) {
                let message = 'Email id is already registered'
                return res.status(400).send(message)
            }
            next()
        })
    },

    createNewUser: function (req, res) {
        if (!passValidator(req.body.password)) return res.status(400).send('Password must contain 1 numeric and 1 special character')
        userModel.newUser(req.body, function (error, result) {
            if (error) {
                return res.status(400).send({ error })
            }
            if (!result) {
                return res.status(400).send('something went wrong')
            }
            res.status(201).send('Success!')
        })
    }
}