import express from 'express'

const router = express.Router()

router.get('/display', (req,res)=>{
    res.send("Products")
})

export default router