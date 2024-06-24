import express from 'express'
import mongoose from 'mongoose'
import { config } from 'dotenv'
import userRouter from './Routes/Users.js'
import productRouter from './Routes/Products.js'
import cookieParser from 'cookie-parser'

const app = express()
const PORT = process.env.PORT || 8000
config({path: './config/.env'})

mongoose.connect(process.env.MONGO_URI).then(console.log("MongoDB Connected"))

app.use(cookieParser())
app.use(express.json())

app.use('/api/v1/user', userRouter)
app.use('/api/v1/product', productRouter)

app.get('/', (req,res)=>{
    res.send("Hello World")
})

app.listen(PORT, ()=>{
    console.log("Server Started at Port: " + PORT);
})