import { projectParser } from '../Config/Type.js'
import { z } from 'zod'
import {ErrorHandler} from '../Middlewares/ErrorHandler.js'
import Project from '../Models/Project.js'
export const getProjects = async(req,res,next) => {
    res.send('helloooo')
}

export const createProject = async(req,res,next) => {
    const bodyParser = req.body
    console.log(req.body.deadline)

    const parsedBody = projectParser.safeParse(bodyParser)

    if(parsedBody.error) {
        console.log(parsedBody.error);
        return next(new ErrorHandler('Enter the data correctly',400))
    }

    const newProject = await Project.create({
        title: parsedBody.data.title,
        description: parsedBody.data.description,
        deadline: parsedBody.data.deadline,
        users: parsedBody.data.users,
        tasks: parsedBody.data.tasks
    })

    if(newProject) { 
        return res.status(200).json({
            success: true,
            message: "Project Created Successfully!"
        })
    } else {
        return res.status(400).json({
            message: "Something went wrong! Try Again Later!"
        })
    }
}