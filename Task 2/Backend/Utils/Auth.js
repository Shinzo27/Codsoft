import jwt from 'jsonwebtoken'

export function generateToken(user,message,statusCode,res) {
    const payload = {
        id: user._id,
        name: user.name,
        role: user.role
    }
     const token = jwt.sign(payload,process.env.JWT_SECRET,{expiresIn: process.env.JWT_EXPIRES})

     const cookieName = "userToken"

     res.cookie(cookieName, token,{
        expires: new Date(Date.now() + process.env.COOKIE_EXPIRES  * 24 * 60 * 60 * 1000),
        httpOnly: true
     }).status(statusCode).json({
        success: true,
        message,
        token
     })
}

