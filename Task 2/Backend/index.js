import express from 'express'
import { config } from 'dotenv'
import cors from 'cors'
import mongoose from 'mongoose'
import cookieParser from 'cookie-parser'
import { errorMiddleware } from './Middlewares/ErrorHandler.js'
import userRouter from './Routes/User.js'

const app = express()
const PORT = process.env.PORT || 8000

config({path: './Config/.env'})

mongoose.connect(process.env.MONGO_URI).then(console.log("MongoDb Connected"))

app.use(cors({
    origin: process.env.FRONTEND_URI,
    methods: ["GET","POST","PUT","DELETE"],
    credentials: true
}))

app.use(cookieParser())
app.use(express.urlencoded({extended: true}))
app.use(express.json())


app.use('/api/v1/user', userRouter)

app.get('/', (req,res)=>{
    res.send('Hello world')
})

app.use(errorMiddleware)

app.listen(PORT, ()=>{console.log("Server listening on port: "+ PORT)})