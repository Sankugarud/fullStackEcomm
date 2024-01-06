const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '../../.env') });
const Razorpay = require("razorpay");
const crypto = require("crypto");

exports.processPayment = async (req, res) => {
  try {
    const instance = {
        key_id: process.env.RAZORPAY_KEY_ID,
    };

    res.status(201).json(instance);
} catch (error) {
    res.status(500).send(error);
}
};

exports.razorPay = async (req, res) => {
    try {
        const razorpay = new Razorpay({
          key_id: process.env.RAZORPAY_KEY_ID,
          key_secret: process.env.RAZORPAY_SECRET,
        });
    
        const options = req.body;
        const order = await razorpay.orders.create(options);
    
        if (!order) {
          return res.status(500).send("Error");
        }
    
        res.json(order);
      } catch (err) {
        res.status(500).send("Error");
      }
}

exports.razorPayValidate = async (req, res) => {

    try {
        const { razorpay_order_id, razorpay_payment_id, razorpay_signature } =
    req.body;

  const sha = crypto.createHmac("sha256", process.env.RAZORPAY_SECRET);
  //order_id + "|" + razorpay_payment_id
  sha.update(`${razorpay_order_id}|${razorpay_payment_id}`);
  const digest = sha.digest("hex");
  if (digest !== razorpay_signature) {
    return res.status(400).json({ msg: "Transaction is not legit!" });
  }

  res.json({
    success: true,
    orderId: razorpay_order_id,
    paymentId: razorpay_payment_id,
  });
    } catch (error) {
        res.json({
            success: false,
            orderId: razorpay_order_id,
            paymentId: razorpay_payment_id,
          });
    }
}

