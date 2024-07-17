import ErrorHandler from '../Middlewares/ErrorHandler.js'
import User from '../Models/User.js'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import { z } from 'zod'
import { signupParser } from '../Config/Type.js'

export const signup = async(req,res,next) => {
    const bodyParser = req.body
    const parsedBody = signupParser.safeParse(bodyParser)

    if(parsedBody.error) return next(new ErrorHandler(parsedBody.error,400))

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
                role: user.role
            }
        }

        jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: 360000}, (err,token)=>{
            if(err) throw err
            res.json({token})
        })
    } catch (error) {
        console.error(error.message)
        res.status(500).send('Server Error')
    }
}

export const signin = async(req,res,next) => {
    res.send("Hello world")
}