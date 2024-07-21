import express from 'express'
import { addUser, createProject, deleteUser, getProjects } from '../Controllers/Project.js'
import { authenticateJwt, projectRole } from '../Middlewares/Auth.js'

const router = express.Router()

router.get('/getProjects', authenticateJwt, getProjects)
router.post('/createProject', authenticateJwt, createProject)
router.post('/addUser/:projectId', authenticateJwt, projectRole('Product Manager'), addUser)
router.delete('/deleteUser/:projectId/users/:userId', authenticateJwt, projectRole('Product Manager'), deleteUser)

export default router