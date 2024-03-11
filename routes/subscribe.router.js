const express = require('express');
const subscribeRouter = express.Router();
const {subscribedUser,getSubscribers, deleteAllSubscribers} = require('../controllers/subscribe.controller');



subscribeRouter.post('/', subscribedUser);
subscribeRouter.get('/', getSubscribers);
subscribeRouter.delete('/',deleteAllSubscribers)


module.exports = subscribeRouter;
