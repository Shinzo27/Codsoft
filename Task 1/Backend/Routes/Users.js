import express from 'express'
import { getUserDetails, userSignin, userSignUp } from '../Controller/Users.js'
import { isCustomerAuthenticated } from '../Middleware/Auth.js'

const router = express.Router()

router.post('/signin', userSignin)
router.post('/signup', userSignUp)
router.get('/customer/me', isCustomerAuthenticated, getUserDetails)

export default router