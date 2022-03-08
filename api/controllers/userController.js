const userModel = require('../models/userModel')
const passValidator = require('../../helpers/utility')

module.exports = user = {

    checkExistingUser: function(req,res,next){
        userModel.checkExistingUser(req.body,function(error,result){
            // console.log(error)
            if(error){
                return res.status(500).send(error)
            }
            else if(result){
                return res.status(400).send(result)
            }
            next()
        })
    },

    createNewUser: function(req,res){
        if(!passValidator(req.body.password))return res.status(400).send('Password must contain 1 numeric and 1 special character')
        userModel.newUser(req.body, function(error,result){
            if(error){
                return res.status(400).send({error})
            }
            if(!result){
                return res.status(400).send('something went wrong')
            }
            res.status(201).send('Success!')
        })
    }
}