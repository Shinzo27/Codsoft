import { instance } from "../server.js"

export const checkout = async(req,res) => {
    const amount = 500;
    const currency = "INR";
  
    const options = {
      amount,
      currency,
    };
  
    try {
      const response = await instance.orders.create(options);
      console.log(response);
      res.status(200).json({
        id: response.id,
        currency: response.currency,
        amount: response.amount,
      });
    } catch (err) {
      console.log(err);
    }
}