import express from 'express'
import { getTasks } from '../Controllers/Task.js'

const router = express.Router()

router.get('/getTasks', getTasks)

export default router