import express from 'express'
import mongoose from 'mongoose'
import { config } from 'dotenv'
import userRouter from './Routes/Users.js'
import productRouter from './Routes/Products.js'
import cookieParser from 'cookie-parser'
import cloudinary from 'cloudinary'
import fileUpload from 'express-fileupload'

const app = express()
const PORT = process.env.PORT || 8000
config({path: './config/.env'})

mongoose.connect(process.env.MONGO_URI).then(console.log("MongoDB Connected"))

cloudinary.v2.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
})

app.use(cookieParser())
app.use(express.urlencoded({extended: true}))
app.use(express.json())

app.use(
    fileUpload({
        useTempFiles: true,
        tempFileDir: "/tmp/",
    })
)

app.use('/api/v1/user', userRouter)
app.use('/api/v1/product', productRouter)

app.get('/', (req,res)=>{
    res.send("Hello World")
})

app.listen(PORT, ()=>{
    console.log("Server Started at Port: " + PORT);
})