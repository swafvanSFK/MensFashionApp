import razorpayInstance from '../config/razorpayInstance.js'
import * as crypto from 'crypto'
import paymentModel from '../models/paymentModel.js';

const paymentController = async (req, res) => {

    const {amount} = req.body;

    const options = {
        amount : Number(amount * 100),
        currency : "INR",
        receipt : crypto.randomBytes(10).toString("hex")
    }

     razorpayInstance.orders.create(options, (error,order)=>{

        if (error){
            console.log(error);
            return res.status(500).json({message : "Somethig went wrong"})
        }
        
        res.status(200).json({data : order,success : true})
        console.log(order);
    })
}


const verify = async (req,res) => {
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = req.body;

    const sign = razorpay_order_id + "|" + razorpay_payment_id;

    const expectedSign = crypto
      .createHmac("sha256", process.env.RAZORPAY_SECRET_KEY || "s")
      .update(sign.toString())
      .digest("hex");

    const isAuthentic = expectedSign === razorpay_signature;
    console.log(isAuthentic);

    if (isAuthentic) {
        const payment = new paymentModel({
          razorpay_order_id,
          razorpay_payment_id,
          razorpay_signature,
        });
  
        await payment.save();
  
        res.json({
          message: "Payement Successfully",
          success: true
        });
      }
}

export  {paymentController,verify}