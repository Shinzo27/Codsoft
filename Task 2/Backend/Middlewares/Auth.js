import jwt from "jsonwebtoken";
import ErrorHandler from "./ErrorHandler.js";
import User from "../Models/Users.js";

export function isEmployeeAuthenticated(req, res, next) {
  const token = req.header("x-auth-token");

  if (!token) {
    return next(new ErrorHandler("Employee is not authenticated!", 400));
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded.user;
    next();
  } catch (err) {
    res.status(401).json({ msg: "Token is not valid" });
  }
}

export function checkRole(requiredRole){
    return function(req,res,next){
        if(req.user && req.user.role === requiredRole) {
            next()
        } else {
            next(new ErrorHandler("User is not authorized",403))
        }
    }
}