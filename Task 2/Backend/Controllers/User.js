import ErrorHandler from '../Middlewares/ErrorHandler.js'
import User from '../Models/User.js'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import { z } from 'zod'
import { signinParser, signupParser } from '../Config/Type.js'
import { generateToken } from '../Utils/Auth.js'

export const signup = async(req,res,next) => {
    const bodyParser = req.body
    const parsedBody = signupParser.safeParse(bodyParser)

    if(parsedBody.error) return next(new ErrorHandler("Enter data correctly!",400))

    try {
        const ifExist = await User.findOne({email: parsedBody.data.email})

        if(ifExist) return next(new ErrorHandler("User already exists!"))
        const bcryptPass = await bcrypt.hash(parsedBody.data.password, 10)

        const user = await User.create({
            name: parsedBody.data.name,
            email: parsedBody.data.email,
            password: bcryptPass,
            role: parsedBody.data.role || 'User'
        })

        generateToken(user,"User Registered Successfully!", 200, res)
    } catch (error) {
        console.error(error.message)
        next(new ErrorHandler(error.message, 400))
    }
}

export const signin = async(req,res,next) => {
    const bodyParser = req.body
    const parsedBody = signinParser.safeParse(bodyParser)

    if(parsedBody.error) return next(new ErrorHandler("Enter data correctly!", 400))
    
    try {
        const user = await User.findOne({
            email: parsedBody.data.email,
        })

        if(!user) return next(new ErrorHandler("Email not found!", 400))

        const comparePassword = await bcrypt.compare(parsedBody.data.password,user.password)

        if(!comparePassword) return next(new ErrorHandler("Password didn't matched!",400))

        generateToken(user,"User Loggedin Successfully!", 200, res)
    } catch (error) {
        console.log(error.message)
        next(new ErrorHandler(error.message, 400))
    }
}

export const getUserInfo = async (req,res,next) => {
    const userId = req.user.id

    if(!userId) next(new ErrorHandler("User is not loggedin", 400))

    const details = await User.findOne({_id: userId})

    return res.status(200).json({
        success: true,
        userDetails: details
    })
}