// all the api(s) and the routes are to be written here
const userController= require('../controllers/userController')
const authController = require('../controllers/authController')
const logController = require('../controllers/logController')



module.exports= function(app){
    app.get('/home',(req,res)=>{
        logController.customEmitter.emit('addLog','home')
        res.send('Welcome to the registration page')
    })
    app.post('/authenticate',userController.validateCredential)

    app.get('/test',authController.validateToken) //just for token validation "testing" 
    app.post('/register',userController.checkExistingUserName,userController.checkExistingUserEmail,userController.createNewUser)

    app.get('/viewlog',logController.Log.fetchLogEntries)
}