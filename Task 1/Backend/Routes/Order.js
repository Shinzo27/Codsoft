import express from 'express'
import { checkout } from '../Controller/Order.js'

const router = express.Router()

router.post('/createOrder', checkout)

export default router