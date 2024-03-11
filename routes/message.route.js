const express = require('express');
const messageRouter = express.Router();
const {sendMessage}  = require('../controllers/message.controller');

messageRouter.post('/', sendMessage);

module.exports = messageRouter;



