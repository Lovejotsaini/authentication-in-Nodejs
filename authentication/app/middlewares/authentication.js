const jwt=require('jsonwebtoken')
const User=require('../models/tasks')

const authenticateUser=(req,res,next)=>{
    const token =req.header('Authorization').split(' ')[1]
    let tokenData
    try{
        tokenData=jwt.verify(token,'love123')
    //    console.log('tdata',tokenData)
        User.findById(tokenData._id)
        .then((user)=>{
         //   console.log('us',user)
            req.user=user
            next()
        })
        .catch((err)=>{
            res.json(err)
        })
    }catch(e){
        res.json(e.message)
    }
    
}


module.exports={
    authenticateUser
}