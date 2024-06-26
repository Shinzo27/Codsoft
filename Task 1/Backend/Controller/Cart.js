import Cart from '../Models/Cart.js'

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
  console.log("Add to Cart");
}