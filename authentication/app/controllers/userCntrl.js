const User = require('../models/tasks')
const bcryptjs = require('bcryptjs')
const jwt=require('jsonwebtoken')

const userCntrl = {}

userCntrl.list = (req, res) => {
    User.find()
        .then((tasks) => {
            res.json(tasks)
        })
        .catch((err) => {
            res.json(err)
        })
}
userCntrl.create = (req, res) => {
    const body = req.body
    const user = new User(body)
    bcryptjs.genSalt()
        .then((salt) => {
            bcryptjs.hash(user.password, salt)
                .then((encrypted) => {
                    user.password = encrypted
                    user.save()
                        .then((user) => {
                            res.json(user)
                        })
                        .catch((err) => {
                            res.json(err)
                        })
                })
        })

}
userCntrl.delete = (req, res) => {
    const id = req.params.id
    User.findByIdAndDelete(id)
        .then((user) => {
            res.json(user)
        })
        .catch((err) => {
            res.json(err)
        })
}
userCntrl.update = (req, res) => {
    const id = req.params.id
    console.log(id)
    const body = req.body
    User.findByIdAndUpdate(id, body, { new: true })
        .then((user) => {
            res.json(user)
        }).catch((err) => {
            res.json(err)
        })
}

userCntrl.login=(req,res)=>{
    const body=req.body
    User.findOne({email: body.email})
    .then((user)=>{
        console.log(user)
        if(!user){
            res.json({
                errors:'invalid email or password'
            })
        }
        console.log(body.password)
        bcryptjs.compare(body.password,user.password)
        .then((match)=>{
            console.log(match)
            if(match){
               const tokenData={
                   _id:user._id,
                   email:user.email,
                   username:user.username
               }
               const token=jwt.sign(tokenData,'love123',{expiresIn : '2d'})
               console.log(token)
               res.json({
                   token : `Bearer ${token}`
               })
            }else{
                res.json({
                    errors:'invalid email or password'
                })
            }
        })
    })
}

userCntrl.account=(req,res)=>{
    res.json(req.user)
}

module.exports = userCntrl