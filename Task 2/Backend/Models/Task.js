import mongoose, { mongo } from "mongoose";

const taskSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String
    },
    status: {
        type: String,
        enum: ['todo', 'in-progress', 'done'], default: 'todo'
    },
    deadline: {
        type: Date
    },
    assignedTo: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    project: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Project'
    }
}, {timestamps: true})

const Task = mongoose.model('Task', taskSchema)

export default Task