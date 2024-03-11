
const blogRouter = require('./blog.routes');
const authRoute = require('./auth.routes');
const userRouter = require('./user.routes');
const messageRouter = require('./message.route');
const subscribeRouter = require('./subscribe.router')
const express = require('express');


const allRoutes = express.Router();


allRoutes.use('/blogs', blogRouter);
allRoutes.use('/auth', authRoute);
allRoutes.use('/users',userRouter);
allRoutes.use('/messages', messageRouter);
allRoutes.use('/subscribers', subscribeRouter);

module.exports = allRoutes;