import express from 'express'
import { getUserInfo, signin, signup } from '../Controllers/User.js'
import { checkRole, isAdminAuthenticated } from '../Middlewares/Auth.js'
const router = express.Router()

router.post('/signin', signin)
router.post('/signup', signup)
router.get('/getUserInfo',getUserInfo)

export default router