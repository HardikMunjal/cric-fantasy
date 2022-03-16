const express = require('express')
const router = express.Router()
const Dream =require('../models/dream')

router.get('/',async(req,res) =>{
    // req.send('Get request')
    try{
        const dreams = await Dream.find()
        res.json(dreams)
    }catch(err){
        res.send('Error'+err)

    }
})    
router.post('/',async(req,res) =>{
    const dream =new Dream({
        id:req.body.id,
        userid:req.body.userid,
        name:req.body.name,
        estimatedate:req.body.estimatedate,
        status:req.body.status,
        createdate:req.body.createdate
        
    })
    try{
        const a1 =await dream.save()
        res.json(a1)

    }catch{
        res.send('Error')
    }

})
router.patch('/:id',async(req,res)=>{
    try{
        const dream=await Dream.findById(req.params.id)
        dream.sub=req.body.sub
        const a1 =await dream.save()
        res.json(a1)

    }catch(err){
        res.send('Error')
    }
})

module.exports=router