const express=require('express')
const app=express()
const configureDB=require('./config/database')
const router=require('./config/routes')

app.use(express.json())

const port=process.env.PORT || 3075
app.use(router)
configureDB()


app.listen(port,()=>{
    console.log('server running on port',port)
})