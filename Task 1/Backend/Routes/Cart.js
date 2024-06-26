import express from 'express'
import { isCustomerAuthenticated } from '../Middleware/Auth.js'
import { addToCart, displayItems } from '../Controller/Cart.js'

const router = express.Router()

router.get('/display', isCustomerAuthenticated, displayItems)
router.post('/addToCart/:id', isCustomerAuthenticated, addToCart)


export default router