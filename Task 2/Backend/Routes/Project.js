import express from 'express'
import { addUser, createProject, getProjects } from '../Controllers/Project.js'
import { authenticateJwt, projectRole } from '../Middlewares/Auth.js'

const router = express.Router()

router.get('/getProjects', getProjects)
router.post('/createProject', authenticateJwt, createProject)
router.post('/addUser/:projectId', authenticateJwt, projectRole('Product Manager'), addUser)

export default router