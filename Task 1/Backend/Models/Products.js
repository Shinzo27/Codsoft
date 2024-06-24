import { Schema, model } from 'mongoose';

const productSchema = new Schema({
    name:{
        type:String,
        required:true,
        unique:true,
    },
    imgUrl:{
        type:String,
        required:true,
    },
    description:{
        type:String,
        required:true,
        unique:true,
    },
    quantity:{
        type:String,
        required:true,
    },
    price: {
        type:Number,
        required:true,
    },
    isActive: {
        type: Boolean,
        required: true,
        enum: ["True","False"]
    },
    category: {
        type: String,
        required: true
    }
});

const Product = model('Product', productSchema);

export default Product