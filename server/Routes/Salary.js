const express =require('express')


const router=express.Router()

router.get('/salary',(req,res)=>{
    res.send("salary");
})

module.exports=router