import express from 'express'
import { addProduct, categoryProduct, getProduct } from '../Controller/Products.js'

const router = express.Router()

router.post('/addProduct', addProduct)
router.get('/filterProduct', getProduct)
router.get('/categoryProduct', categoryProduct)

export default router