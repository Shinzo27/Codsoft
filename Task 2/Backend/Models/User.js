import { Schema, model } from 'mongoose'; // Erase if already required

// Declare the Schema of the Mongo model
var userSchema = new Schema({
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
    mobile:{
        type:String,
        required:true,
        unique:true,
    },
    password:{
        type:String,
        required:true,
    },
});

const User = model('User', userSchema);
//Export the model
export default User