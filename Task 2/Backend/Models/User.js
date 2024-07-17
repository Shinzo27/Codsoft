import { Schema, model } from 'mongoose'; 

const userSchema = new Schema({
    name:{
        type:String,
        required:true,
        unique:true,
        index:true,
    },
    email:{
        type:String,
        required:true,
        unique:true,
    },
    password:{
        type:String,
        required:true,
    },
    role: {
        type: String,
        required: true,
        enum: ['Admin','User']
    }
});

const User = model('User', userSchema);

export default User