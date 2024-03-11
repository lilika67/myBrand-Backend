const express = require('express');
const passport = require('passport')
const { findById, remove, getUsers, update, findByEmail, record } = require('../controllers/user.controller');
const userRouter = express.Router();

userRouter.get('/', getUsers);
userRouter.put('/', update);
userRouter.post('/', record);
userRouter.delete('/', remove);
userRouter.get('/', findById);
userRouter.get('/', findByEmail);


module.exports= userRouter;
