import  express from 'express'

const router = express.Router()

router.get('/pay', (req,res)=>{
    res.send('Payment Done!')
})

export default router