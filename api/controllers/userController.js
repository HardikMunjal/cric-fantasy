const bcrypt = require('bcryptjs')
const User = require('../schemas/userSchema')
const userModel = require('../models/userModel')
const passValidator = require('../../helpers/utility')
const auth = require('./authController')

module.exports = user = {

    checkExistingUser: function (req, res, next) {
        userModel.checkExistingUser(req.body, function (error, result) {
            // console.log(error)
            if (error) {
                return res.status(500).send(error)
            }
            else if (result) {
                return res.status(400).send(result)
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
    },

    validateCredential: async function (req, res) {
        const email = req.body.email
        const password = req.body.password
        if(!email || !password) {
            res.status(403).json({"error": 'Email & password required'})
        }
        else {
            const umail = await User.findOne({ email: email });
            if (!umail) {
                res.status(403).json({"error":'User does not exist'});
            }
    
            else {
                const match =await bcrypt.compare(password, umail.password);
    
                if (match) {
                    const accessToken = auth.createToken(umail)
                    res.status(200).json(accessToken)
    
                }
                else {
                    res.status(403).json({error:"Invalid password"});
    
                }
            }
        }
    }
}