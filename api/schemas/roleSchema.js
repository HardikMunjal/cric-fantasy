const mongoose = require("mongoose");
const validator = require("validator");
 
const roleSchema = new mongoose.Schema({
   name : {
       type: String,
       required: true,
       maxlength: 50,
       validate: {
          validator: (val) =>
           validator.isAlpha(val, ["en-US"], { ignore: " " }),
          message: "A name must only  contain characters",
       }
   },
  
       description:{
           type:String,
           
       },
       
       feature:{
           type:String,
           required:true,
           enum: ["task-read", "task-write","user-read","user-write"],
 
       }
  
})
 
const Role = new mongoose.model('Role',roleSchema);
 
module.exports = Role;
