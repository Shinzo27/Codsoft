import express from 'express'
import mongoose from 'mongoose'
import { config } from 'dotenv'

const app = express()
const PORT = process.env.PORT || 8000
config({path: './config/.env'})

mongoose.connect(process.env.MONGO_URI).then(console.log("MongoDB Connected"))

app.get('/', (req,res)=>{
    res.send("Hello World")
})

app.listen(PORT, ()=>{
    console.log("Server Started at Port: "+ PORT);
})