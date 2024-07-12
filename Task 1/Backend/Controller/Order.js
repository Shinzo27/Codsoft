import Razorpay from "razorpay";
import { instance } from "../index.js";
import ErrorHandler from "../Middleware/ErrorHandler.js";

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
  // const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = req.body;

  // const body = razorpay_order_id + "|" + razorpay_payment_id;

  // const expectedSignature = crypto
  //   .createHmac("sha256", process.env.RAZORPAY_SECRET_KEY)
  //   .update(body.toString())
  //   .digest("hex");

  // const isAuthentic = expectedSignature === razorpay_signature;

  // if (isAuthentic) {
  //   res.redirect(
  //     `http://localhost:5173/paymentsuccess?reference=${razorpay_payment_id}`
  //   );
  // } else {
  //   res.status(400).json({
  //     success: false,
  //   });
  // }
  console.log(req.body)
  res.status(200).json({
    success: true
  })
};
