const User = require('../schemas/userSchema')

module.exports = userModels = {
    newUser: async (details ,callback) => {
        const user = new User(details.body)
        user.userImage=details.file.path
        try {
            await user.save()
            callback(undefined, user)
        } catch (error) {

            callback(error,undefined)
        }

    },

    checkExistingUserName: async(details,callback)=>{
        try {
            let uname= await User.find({username: details.username} )
            callback(undefined, uname)
        } catch (error) {
            callback(error,undefined)
        }
    },
    checkExistingUserEmail: async (details, callback)=>{
        try {
            let mail= await User.find({ email: details.email})
            callback(undefined,mail)
        } catch (error) {
            callback(error, undefined)
        }
    },

}