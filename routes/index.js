// all the api(s) and the routes are to be written here

//sample api 
module.exports= (app)=>{
    app.get('/',(req,res)=>{
        res.send('Welcome to the registration page')
    })
}