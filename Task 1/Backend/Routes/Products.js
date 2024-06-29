import express from 'express'
import { addProduct, getProduct } from '../Controller/Products.js'

const router = express.Router()

router.post('/addProduct', addProduct)
router.get('/filterProduct', getProduct)

export default router