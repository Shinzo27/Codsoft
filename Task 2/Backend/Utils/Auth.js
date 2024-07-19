import jwt from 'jsonwebtoken'

export function checkForAuthentication(cookieName) {
    return(req,res,next)=>{
        const token = req.cookies[cookieName]
        if(!token) return next()
        
        try {
            const payload = jwt.verify(token, process.env.JWT_SECRET_KEY)
            req.user = payload
        } catch (error) {
            console.error(error)
        }
        return next()
    }
}

export function generateToken(user,message,statusCode,res) {
    const payload = {
        id: user._id,
        name: user.name,
        role: user.role
    }
     const token = jwt.sign(payload,process.env.JWT_SECRET,{expiresIn: process.env.JWT_EXPIRES})

     const cookieName = user.role === 'Admin' ? "adminToken" : "userToken"

     res.cookie(cookieName, token,{
        expires: new Date(Date.now() + process.env.COOKIE_EXPIRES  * 24 * 60 * 60 * 1000),
        httpOnly: true
     }).status(statusCode).json({
        success: true,
        message,
        token
     })
}