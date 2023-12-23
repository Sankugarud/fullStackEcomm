const express = require('express');
const path = require('path');
const router = express.Router();
require('dotenv').config({ path: path.join(__dirname, '../../.env') });
const {processPayment, sendStripeApiKey,
} = require("../function/paymentApi");


const verifyAuthToken = require('../middleware/varifytoken');

router.post("/payment/process",verifyAuthToken, processPayment);
router.post("/payment/razorPay",verifyAuthToken, processPayment);
router.post("/payment/razorPayValidate",verifyAuthToken, processPayment);


module.exports = router;