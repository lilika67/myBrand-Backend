const express = require('express');
const { SignIn, SignUp, ForgotPassword } = require('../controllers/auth.controller');
const authRoute = express.Router();


authRoute.post('/signin', SignIn);
authRoute.post('/signup', SignUp);
authRoute.post('/password', ForgotPassword);



module.exports = authRoute;