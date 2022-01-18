const express=require('express')
const router=express.Router()
//controller
const userCntrl=require('../app/controllers/userCntrl')
//middleware
const {authenticateUser}=require('../app/middlewares/authentication')

//CRUD
router.get('/api/auth',userCntrl.list)
router.get('/api/account',authenticateUser,userCntrl.account)
router.post('/api/register',userCntrl.create)
router.post('/api/login',userCntrl.login)
router.delete('/api/auth/:id',userCntrl.delete)
router.put('/api/auth/:id',userCntrl.update)


module.exports=router