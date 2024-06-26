import { Schema, model } from 'mongoose'; 

const cartSchema = new Schema({
    userId:{
        type:String,
        required:true,
        unique:true,
        index:true,
    },
    productId:{
        type:String,
        required:true,
        unique:true,
    },
    quantity:{
        type:String,
        required:true,
        unique:true,
    },
    totalPrice:{
        type:String,
        required:true,
    },
}, {timestamps: true});

const Cart = model('Cart', cartSchema);

export default Cart