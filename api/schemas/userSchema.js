//user schemas to be declared here
const mongoose = require('mongoose')
const validator = require('validator')
const bcrypt = require('bcryptjs')
const userSchema = new mongoose.Schema({
    firstname:{
        type: String,
        required:true,
        trim:true
    },
    lastname:{
        type:String,
        required:true,
        trim:true
    },
    username:{
        type:String,
        required:true,
        trim:true
    },
    email:{
        type:String,
        required:true,
        trim:true,
        validate(value){
            if(!validator.isEmail(value)){
                throw new Error('Not a valid email! ')
            }
        }
    },
    password:{
        type:String,
        required:true,
        minlength:7,
        validate(value){
            if(value.toLowerCase().includes('password')){
                throw new Error("password cannot contain the word 'Password'")
            }

        }
    },
    friends:{
        type: [mongoose.Schema.Types.ObjectId],
        required: false,
    },
    createdBy:{
		type:String,
		default:null
	},
	createdAt:{
		type: Date,
		default:Date.now
	},
	modifiedAt:{
		type: Date,
		default:Date.now
	},
    status:{
        type: Boolean,
        default:false
    }
})

userSchema.pre('save',async function(next){//a middleware to ensure encrypted password
    const user = this//referring to the current user
    
    if(user.isModified('password')){//checking whether the user has already hashed the passwod or not
        user.password= await bcrypt.hash(user.password,8)//hashing and incrypting the password before saving it in the db
    }

    next()
})

module.exports = User  = mongoose.model('User',userSchema)

