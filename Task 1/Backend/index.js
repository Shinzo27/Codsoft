import express from 'express'
import mongoose from 'mongoose'
import { config } from 'dotenv'
import userRouter from './Routes/Users.js'
import productRouter from './Routes/Products.js'
import cartRouter from './Routes/Cart.js'
import paymentRouter from './Routes/Payment.js'
import cookieParser from 'cookie-parser'
import cloudinary from 'cloudinary'
import fileUpload from 'express-fileupload'
import { errorMiddleware } from './Middleware/ErrorHandler.js'
import { checkForAuthentication } from './Utils/Auth.js'
import cors from 'cors'

const app = express()
const PORT = process.env.PORT || 8000
config({path: './config/.env'})

mongoose.connect(process.env.MONGO_URI, console.log("MongoDB Connected"))

cloudinary.v2.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
})

app.use(cors({
    origin: [process.env.FRONTEND_URL],
    methods: ["GET","POST","PUT","DELETE"],
    credentials: true
}))

app.use(cookieParser())
app.use(express.urlencoded({extended: true}))
app.use(express.json())
app.use(checkForAuthentication('CustomerToken'))

app.use(
    fileUpload({
        useTempFiles: true,
        tempFileDir: "/tmp/",
    })
)

app.use('/api/v1/user', userRouter)
app.use('/api/v1/product', productRouter)
app.use('/api/v1/cart', cartRouter)
app.use('/api/v1/payment', paymentRouter)

app.get('/', (req,res)=>{
    res.send("Hello World")
})

app.use(errorMiddleware)

app.listen(PORT, ()=>{
    console.log("Server Started at Port: " + PORT);
})