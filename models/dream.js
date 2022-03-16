const mongoose=require('mongoose')
const alienSchema =new mongoose.Schema({
    id:{
        type:Number,
        required:true

    },
    userid:{
        type:Number,
        required:true

    },
    name:{
        type:String,
        required:true

    },
    // estimatedate:{
    //     type:String,
    //     required:true
    // },
    status:{
        type:String,
        required:true,
        default:false,
    },
    // createdate:{
    //     type:String,
    //     required:true
    // },
})
// const historySchema =new mongoose.Schema({
//     id:{
//         type:Number,
//         required:true

//     },
//     userid:{
//         type:Number,
//         required:true

//     },
//     name:{
//         type:String,
//         required:true,
//     },
//     estimatedate:{
//         type:String,
//         required:true,
//     },
//     createdate:{
//         type:String,
//         required:true
//     },
// })
var mhl=require('mongoose-history-log');
var history=new mongoose.Schema({name:String});
mhl(history);
[{
        id:{
            type:Number,
            required:true
    
        },
        userid:{
            type:Number,
            required:true
    
        },
        name:{
            type:String,
            required:true,
        },
        estimatedate:{
            type:String,
            required:true,
        },
        createdate:{
            type:String,
            required:true
        },
        meta:{}
}]
var user=mongooosel.model('user');
user.findOne('id',function(err,doc){
    doc.history.push({status:"foo"});
    doc.save();
})
module.exports=mongoose.model('Alien',alienSchema)