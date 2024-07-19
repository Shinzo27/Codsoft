import express from 'express'
import { getProjects } from '../Controllers/Project.js'

const router = express.Router()

router.get('/getProjects', getProjects)

export default router