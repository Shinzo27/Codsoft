import express from 'express'
import { isCustomerAuthenticated } from '../Middleware/Auth.js'
import { displayItems } from '../Controller/Cart.js'

const router = express.Router()

router.get('/display', isCustomerAuthenticated, displayItems)


export default router