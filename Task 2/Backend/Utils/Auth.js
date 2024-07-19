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