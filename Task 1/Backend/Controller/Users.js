import { SignIn, SignUp } from '../config/type.js'
import User from '../Models/Users.js'
import { generateToken } from '../Utils/Auth.js'
import { ErrorHandler } from '../Middleware/ErrorHandler.js'

export const userSignin = async(req,res,next) => {
    const BodyParser = req.body
    console.log(BodyParser);
    const parsedPayload = SignIn.safeParse(BodyParser)

    if(!parsedPayload.success) {
        return next(new ErrorHandler("Fill details properly!", 400))
    }

    const isExists = await User.findOne({ username: parsedPayload.data.username, role: 'Customer'})

    if(!isExists) return next(new ErrorHandler("User doesn't exists!", 400))

    const isMatchedPassword = await isExists.comparePassword(parsedPayload.data.password)

    if(!isMatchedPassword) return next(new ErrorHandler("Password didn't matched!", 400))

    generateToken(isExists, "Login Successfull", 201, res)
}

export const userSignUp = async(req,res) => {
    const BodyParser = req.body
    const parsedPayload = SignUp.safeParse(BodyParser)

    if(!parsedPayload.success) return res.status(400).json({
        success: false,
        message: "Fill all the details properly!"
    })

    const isUsernameExists = await User.findOne({username: parsedPayload.data.username})

    if(isUsernameExists) return res.status(400).json({
        success: false,
        message: "Username Already Taken!"
    })
    
    const isEmailExists = await User.findOne({email: parsedPayload.data.email})

    if(isEmailExists) return res.status(400).json({
        success: false,
        message: "Email Already Taken!"
    })

    const user = await User.create({
        username: parsedPayload.data.username,
        email: parsedPayload.data.email,
        password: parsedPayload.data.password,
        role: "Customer"
    })

    if(user) return res.status(200).json({
        success: true,
        message: "User Registered Successfully!"
    })
    else { 
        return res.status(400).json({
            success: false,
            message: "Something Went Wrong!"
        })
    }
}