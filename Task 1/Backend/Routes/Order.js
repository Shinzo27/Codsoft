import express from 'express'
import { checkout, verifyPayment } from '../Controller/Order.js'

const router = express.Router()

router.post('/createOrder', checkout)
router.post('/verifyPayment', verifyPayment)

export default router