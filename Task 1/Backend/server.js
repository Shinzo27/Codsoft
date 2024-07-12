import { app } from "./index.js";
import Razorpay from 'razorpay'

export const instance = new Razorpay({
    key_id: process.env.RAZORPAY_API_KEY,
    key_secret: process.env.RAZORPAY_APT_SECRET,
});

app.listen(8000, () =>
    console.log(`Server is working on 8000`)
);
