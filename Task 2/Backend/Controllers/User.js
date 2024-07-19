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

        const payload = {
            user: {
                id: user._id,
                role: user.role,
                name: user.name
            }
        }

        jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: 600000}, (err,token)=>{
            if(err) throw err
            res.json({
                success: true,
                token
            })
        })
    } catch (error) {
        console.error(error.message)
        res.status(500).send('Server Error')
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
        res.status(500).send('Server Error')
    }
}

export const getUserInfo = async (req,res,next) => {
    const userId = req.user.id
    const details = await User.findOne({_id: userId})

    return res.status(200).json({
        success: true,
        userDetails: details
    })
}