// all the api(s) and the routes are to be written here
const userController= require('../controllers/userController')



module.exports= function(app){
    app.get('',(req,res)=>{
        res.send('Welcome to the registration page')
    })

    app.post('/register',userController.checkExistingUser,userController.createNewUser)
}