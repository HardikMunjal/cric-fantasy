const User = require('../schemas/userSchema')

module.exports = userModels = {
    newUser: async (details ,callback) => {
        const user = new User(details)
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

    // checkExistingUser: async (details, callback) => {
    //     try {
    //         let uname = await User.find({ username: details.username }).exec()
    //         const mail = await User.find({ email: details.email }) 
    //         if (uname.length>0) {
    //             callback(undefined, 'username is already taken')
    //         } else if (mail.length>0) {
    //             callback(undefined,'email id alreaedy taken')
    //         }
    //         else callback(undefined, undefined)

    //     } catch (error) {
    //         callback(error,undefined)

    //     }

    // }
}