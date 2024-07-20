import { newUserParser, projectParser } from "../Config/Type.js";
import { z } from "zod";
import { ErrorHandler } from "../Middlewares/ErrorHandler.js";
import Project from "../Models/Project.js";
import User from "../Models/User.js";
import nodemailer from 'nodemailer'

export const getProjects = async (req, res, next) => {
  res.send("helloooo");
};

export const createProject = async (req, res, next) => {
  const bodyParser = req.body;

  const parsedBody = projectParser.safeParse(bodyParser);

  if (parsedBody.error) {
    console.log(parsedBody.error);
    return next(new ErrorHandler("Enter the data correctly", 400));
  }

  const newProject = await Project.create({
    title: parsedBody.data.title,
    description: parsedBody.data.description,
    deadline: parsedBody.data.deadline,
    users: {
      id: parsedBody.data.users.id,
      role: parsedBody.data.users.role,
    },
    tasks: parsedBody.data.tasks,
  });

  if (newProject) {
    const updateUser = await User.findOneAndUpdate(
      {
        _id: req.user.id,
      },
      {
        projects: {
          projectId: newProject._id,
          role: "Product Manager",
        },
      }
    );
    if (updateUser) {
      return res.status(200).json({
        success: true,
        message: "Project Created Successfully!",
      });
    }
  } else {
    return res.status(400).json({
      message: "Something went wrong! Try Again Later!",
    });
  }
};

export const addUser = async (req, res, next) => {
  const projectId = req.params.projectId;
  const bodyParser = req.body;
  const parsedBody = newUserParser.safeParse(bodyParser);

  if (parsedBody.error) return next(new ErrorHandler("Fill all the data properly!", 400));

  //flowchart
  const ifExists = await User.findOne({email: parsedBody.data.email})

  if(ifExists) {
    const userUpdate = await User.findOneAndUpdate({
        email: parsedBody.data.email
    }, {
        $push: {
            projects: {
                projectId,
                role: parsedBody.data.role
            }
        }
    })
    if(userUpdate) {
        const projectTable = await Project.findOneAndUpdate({
            _id: projectId
        }, {
            $push: {
                users: {
                    id: ifExists._id,
                    role: parsedBody.data.role
                }
            }
        }, { new: true })

        if(projectTable) {
            const transporter = nodemailer.createTransport({
                service: 'gmail',
                auth: {
                    user: process.env.USER_MAIL,
                    pass: process.env.USER_PASS
                }
            })

            const mailOption = {
                from: process.env.USER_MAIL,
                to: parsedBody.data.email,
                subject: `Invitation to join project: ${projectTable.name}`,
                text: `You have been invited to join the project: ${projectTable.name}. Please log in to accept the invitation`
            }

            try {
                await transporter.sendMail(mailOption)
                return res.status(200).json({
                    success: true,
                    message: "Invitation email sent to the user!"
                })
            } catch (error) {
                next(new ErrorHandler("Error sending email" + error, 400))
            }
        } else {
            next(new ErrorHandler("Something went wront!",400))
        }
    } else {
        next(new ErrorHandler("Something went wront!",400))
    }
  } else {
    const user = await User.create({
        name: parsedBody.data.name,
        email: parsedBody.data.email,
        password: parsedBody.data.name,
        role: 'Admin',
        projects: {
            projectId,
            role: parsedBody.data.role
        }
    })
  }
};