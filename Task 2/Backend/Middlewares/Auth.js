import jwt from "jsonwebtoken";
import ErrorHandler from "./ErrorHandler.js";
import User from "../Models/User.js";

export function checkRole(requiredRole){
    return function(req,res,next){
        if(req.user && req.user.role === requiredRole) {
            next()
        } else {
            next(new ErrorHandler("User is not authorized",403))
        }
    }
}

export const isUserAuthenticated = async(req,res,next)=>{
  const token = req.cookies.userToken

  if(!token) return next(new ErrorHandler("User not authenticated", 400))

  const decode = jwt.verify(token,process.env.JWT_SECRET)
  req.user = await User.findById(decode.id)

  if(req.user.role !== "User") return next(new ErrorHandler("User is not authenticated", 403));

  next()
}

export const isAdminAuthenticated = async(req,res,next)=>{
  const token = req.cookies.adminToken

  if(!token) return next(new ErrorHandler("Admin not authenticated", 400))

  const decode = jwt.verify(token,process.env.JWT_SECRET)
  req.user = await User.findById(decode.id)

  if(req.user.role !== "Admin") return next(new ErrorHandler("Admin is not authenticated", 403));

  next()
}

