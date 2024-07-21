import express from 'express'
import { addUser, createProject, deleteUser, editProject, getAllUsers, getProjectDetail, getProjects } from '../Controllers/Project.js'
import { authenticateJwt, projectRole } from '../Middlewares/Auth.js'

const router = express.Router()

router.get('/getProjects', authenticateJwt, getProjects)
router.get('/getProjectDetail/:projectId', authenticateJwt, getProjectDetail)
router.post('/createProject', authenticateJwt, createProject)
router.post('/addUser/:projectId', authenticateJwt, projectRole('Product Manager'), addUser)
router.delete('/deleteUser/:projectId/users/:userId', authenticateJwt, projectRole('Product Manager'), deleteUser)
router.put('/editProject/:projectId', authenticateJwt, projectRole('Product Manager'), editProject)
router.get('/getAllUsers/:projectId', authenticateJwt, getAllUsers)

export default router