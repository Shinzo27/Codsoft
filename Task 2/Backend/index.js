import express from 'express'
import { config } from 'dotenv'
import cors from 'cors'
import mongoose from 'mongoose'
import cookieParser from 'cookie-parser'

const app = express()

const PORT = process.env.PORT || 8000
config({path: './Config/.env'})
app.use(cors({
    origin: process.env.FRONTEND_URI,
    methods: ["GET","POST","PUT","DELETE"],
    credentials: true
}))

app.use(cookieParser())
app.use(express.urlencoded({extended: true}))
app.use(express.json())

// mongoose.connect()

app.get('/', (req,res)=>{
    res.send('Hello world')
})

app.listen(PORT, ()=>{console.log("Server listening on port: "+ PORT)})