import express from 'express'
import { userSignin, userSignUp } from '../Controller/Users.js'

const router = express.Router()

router.post('/signin', userSignin)
router.post('/signup', userSignUp)

export default router