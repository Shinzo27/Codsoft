import express from 'express'
import { getUserInfo, signin, signup } from '../Controllers/User.js'
import {authenticateJwt, authorizeRole} from '../Middlewares/Auth.js'
const router = express.Router()

router.post('/signin', signin)
router.post('/signup', signup)
router.get('/getUserInfo',authenticateJwt, authorizeRole('Admin'),getUserInfo)

export default router