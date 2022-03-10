// all the api(s) and the routes are to be written here
const userController= require('../controllers/userController')
const authController = require('../controllers/authController')



module.exports= function(app){
    app.get('',(req,res)=>{
        res.send('Welcome to the registration page')
    })

    app.post('/register',userController.checkExistingUser,userController.createNewUser)


    app.post('/authenticate',userController.validateCredential)

    app.get('/test',authController.validateToken) //just for token validation "testing" 
}