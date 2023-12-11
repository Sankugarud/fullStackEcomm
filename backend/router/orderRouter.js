
const express = require('express');
const path = require('path');
const router = express.Router();
require('dotenv').config({ path: path.join(__dirname, '../../.env') });
const { createOrder, getSingleOrder, myOrders, getAllOrders, updateOrder, deleteOrder } = require('../function/orderApi');
const verifyAuthToken = require('../middleware/varifytoken');
const { authorizeRoles } = require('../middleware/changeRole');


//oders route
router.post('/order/new',verifyAuthToken, createOrder)
router.get('/order/:id', verifyAuthToken, getSingleOrder)
router.get('/orders/user', verifyAuthToken, myOrders)
router.get('/admin/orders', verifyAuthToken, authorizeRoles("admin"), getAllOrders)
router.put('/admin/order/:id', verifyAuthToken, authorizeRoles("admin"), updateOrder)
router.delete('/admin/order/:id', verifyAuthToken, authorizeRoles("admin"), deleteOrder)

module.exports = router