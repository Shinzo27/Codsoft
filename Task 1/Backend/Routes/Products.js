import express from 'express'
import { addProduct, displayProducts } from '../Controller/Products.js'

const router = express.Router()

router.get('/display', displayProducts)
router.post('/addProduct', addProduct)

export default router