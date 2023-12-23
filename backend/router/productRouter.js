
const express = require('express');
const path = require('path');
const router = express.Router();
require('dotenv').config({ path: path.join(__dirname, '../../.env') });

const { createProduct, getProducts,getproduct, updateproduct,deleteproduct, createProductReview, getProductReviews, deleteReview, getAdminProducts } = require('../function/productApis');
const verifyAuthToken = require('../middleware/varifytoken');
const { authorizeRoles } = require('../middleware/changeRole');

//product routes
router.post('/admin/product/new',verifyAuthToken, authorizeRoles("admin"), createProduct);
router.get('/products', getProducts);
router.put('/admin/product/:id',verifyAuthToken, authorizeRoles("admin"), updateproduct);
router.delete('/admin/product/:id',verifyAuthToken, authorizeRoles("admin"), deleteproduct);
router.get('/product/:id', getproduct);
router.get('/admin/products',verifyAuthToken, authorizeRoles("admin"),getAdminProducts);

//reviews
router.put("/review",verifyAuthToken,createProductReview);
router.get("/review",verifyAuthToken,getProductReviews);
router.delete("/review",verifyAuthToken,deleteReview);


module.exports = router