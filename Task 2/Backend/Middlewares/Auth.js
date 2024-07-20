import jwt from "jsonwebtoken";
import ErrorHandler from "./ErrorHandler.js";
import User from "../Models/User.js";

export const authenticateJwt = async(req,res,next) => {
    const token = req.cookies.userToken

    if(!token) return next(new ErrorHandler("User is not authenticated", 400))

    const decode = jwt.verify(token, process.env.JWT_SECRET)

    try {
      req.user = await User.findById(decode.id).select('-password')
      
    } catch (error) {
      next(new ErrorHandler(error.message,400))
    }
    next()
}

export function authorizeRole(...roles) {
  return (req,res,next)=>{
    if(!roles.includes(req.user.role)){
      return next(new ErrorHandler("User is not authorized!", 403))
    }
    next()
  }
}

