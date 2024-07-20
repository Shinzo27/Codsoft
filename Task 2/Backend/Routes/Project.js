import express from 'express'
import { createProject, getProjects } from '../Controllers/Project.js'
import { authenticateJwt, authorizeRole } from '../Middlewares/Auth.js'

const router = express.Router()

router.get('/getProjects', getProjects)
router.post('/createProject', authenticateJwt, authorizeRole('Admin'), createProject)

export default router