import express from 'express'
import { getUserInfo, logout, signin, signup } from '../Controllers/User.js'
import {authenticateJwt} from '../Middlewares/Auth.js'
const router = express.Router()

router.post('/signin', signin)
router.post('/signup', signup)
router.get('/getUserInfo',authenticateJwt, getUserInfo)
router.get('/logout', logout)

export default router