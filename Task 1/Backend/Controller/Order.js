import Razorpay from "razorpay";
import { instance } from "../index.js";
import ErrorHandler from "../Middleware/ErrorHandler.js";
import crypto from 'crypto'
import Cart from "../Models/Cart.js";
import Order from "../Models/Order.js";

export const checkout = async (req, res, next) => {
  const { amount } = req.body
  const options = {
    amount: Number(amount * 100),
    currency: "INR",
  };

  const order = await instance.orders.create(options);

  if (!order) return new ErrorHandler("Something went wrong", 400);

  res.status(200).json({
    success: true,
    order,
  });
};

export const verifyPayment = async (req, res, next) => {
  const { razorpay_order_id, razorpay_payment_id, razorpay_signature, address, city, state, pincode } = req.body;

  const body = razorpay_order_id + "|" + razorpay_payment_id;

  const expectedSignature = crypto
    .createHmac("sha256", process.env.RAZORPAY_SECRET_KEY)
    .update(body.toString())
    .digest("hex");

  const isAuthentic = expectedSignature === razorpay_signature;
  const userId = req.user._id
  if (isAuthentic) {
    const cartItems = await Cart.find({userId})

    if(!cartItems.length) {
      return new ErrorHandler("No items in cart")
    }

    const totalAmount = cartItems.reduce((total, item) => total + (item.productId.price * item.quantity), 0);

    const newOrder = await Order.create({
      user: userId,
      address,
      city,
      state,
      pincode,
      total: totalAmount,
      products: cartItems.map((item)=>{
        name: item.productId.name;
        quantity: item.quantity;
        price: item.productId.price
      }),
      orderId: razorpay_order_id
    })

    await Cart.deleteMany({ userId })

    return res.redirect('http://localhost:5173/paymentSuccess')
  //   res.redirect(
  //     `http://localhost:5173/paymentsuccess?reference=${razorpay_payment_id}`
  //   );
  // } else {
  //   res.status(400).json({
  //     success: false,
  //   });
  }

  res.status(200).json({
    success: true
  })
};
