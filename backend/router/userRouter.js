const express = require('express');
const path = require('path');
const router = express.Router();
require('dotenv').config({ path: path.join(__dirname, '../../.env') });
const verifyAuthToken = require('../middleware/varifytoken');
const { authorizeRoles } = require('../middleware/changeRole');
const { registerUser, login, logout, forgotPassword, resetPassword, changePassword, getUserDetails, updateProfile, getAllUser, getSingleUser, updateUserRole, deleteUser } = require('../function/userApis');
const { Router } = require('express');

//user registation and auth
router.post('/auth/register', registerUser);
router.post('/auth/login', login);
router.get('/auth/logout', logout);

//password changing
router.post('/auth/password/forget', forgotPassword);
router.put('/auth/password/reset/:token', resetPassword);
router.put('/auth/change-password', verifyAuthToken, changePassword);
router.get('/auth/me',verifyAuthToken, getUserDetails);
router.put('/auth/me/update',verifyAuthToken, updateProfile);

//admin route
router.get('/auth/admin/users',verifyAuthToken, authorizeRoles("admin"), getAllUser)
router.get('/auth/admin/user/:id',verifyAuthToken, authorizeRoles("admin"), getSingleUser)
router.put('/auth/admin/user/:id',verifyAuthToken, authorizeRoles("admin"), updateUserRole)
router.delete('/auth/admin/user/:id',verifyAuthToken, authorizeRoles("admin"), deleteUser)

module.exports = router