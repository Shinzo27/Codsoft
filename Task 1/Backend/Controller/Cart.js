import Cart from '../Models/Cart.js'
import ErrorHandler from "../Middleware/ErrorHandler.js";
import Product from '../Models/Products.js'

export const displayItems = async (req, res) => {
  const userId = req.user._id;
  
  const cartItems = await Cart.find({ userId }).populate(
    "productId",
    "name, imgUrl"
  );

  return res.status(200).json({
    cartItems,
  });
};

export const addToCart = async (req,res) => { 
  const productId = req.params.id;
    const userId = req.user._id;
    const { quantity } = req.body;
    if(!userId) return res.status(400).json({
      success: false,
      message: "User is not authenticated!"
    })

    if(!quantity) return res.status(400).json({
      success: false,
      message: "Enter quantity properly!"
    })
    
    const checkIfExist = await Cart.findOne({productId})
    if(checkIfExist) return res.status(400).json({
      success: false,
      message: "Product is already added in to the cart!"
    })
    
    const prod = await Product.findOne({_id: productId})

    if(prod.quantity > quantity) {
      const price = prod.price
        var totalPrice = quantity * price;

        const insert = await Cart.create({
            userId,
            productId,
            quantity,
            totalPrice
        })

        if(insert) return res.status(200).json({
            success: true,
            message: "Product added to the cart successfully!"
        })
    } else {
        return res.status(400).json({
          success: false,
          message: "Not enough quantity!"
        })
    }
}

export const increaseQuantity = async(req,res,next)=>{
  const _id = req.params.id;

  const cartProduct = await Cart.findOne({_id})
  const productId = cartProduct.productId
  const prod = await Product.findOne({_id: productId})

  const newPrice = parseFloat(cartProduct.totalPrice) + parseFloat(prod.price);
  const newQuantity = parseInt(cartProduct.quantity) + 1;

  const update = await Cart.findOneAndUpdate({_id}, {totalPrice: newPrice, quantity: newQuantity}, {new: true})

  if(update) {
      return res.status(200).json({
          success: true,
          message: "Product Quantity Increased!"
      })
  } else {
      return res.status(400).json({
          success: false,
          message: "Not Updated!"
      })
  }
}

export const reduceQuantity = async(req,res,next)=>{
  const _id = req.params.id;

  const cartProduct = await Cart.findOne({_id})

  if(cartProduct.quantity <= 1) return next(new ErrorHandler("Quantity cannot be reduced more than 1!", 400))
  
  const productId = cartProduct.productId
  const prod = await Product.findOne({_id: productId})
  
  const newPrice = parseFloat(cartProduct.totalPrice) - parseFloat(prod.price);
  const newQuantity = parseInt(cartProduct.quantity) - 1;

  const update = await Cart.findOneAndUpdate({_id}, {totalPrice: newPrice, quantity: newQuantity}, {new: true})
  
  if(update) {
      return res.status(200).json({
          success: true,
          message: "Product Quantity Reduced!"
      })
  } else {
      return res.status(400).json({
          success: false,
          message: "Not Updated!"
      })
  }
}

export const removeCartItem = async(req,res,next)=>{
  const _id = req.params.id;

  const remove = await Cart.deleteOne({_id})

  if(remove) return res.status(200).json({
      success: true,
      message: "Item removed successfully!"
  })
  else {
      return res.status(400).json({
          message: "Item not found!"
      })
  }
}